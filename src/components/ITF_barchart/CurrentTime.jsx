import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const StyledTimeText = styled.text`
  text-anchor: middle;
  transform: ${(props) => props.offset};
  font-weight: 600;
  font-size: 18px;
  alignment-baseline: central;
`;

const CurrentTime = ({ margin, dimensions, xScale, stroke }) => {

  const getCurrentHour = () => new Date().getUTCHours();
  const getCurrentMinute = () => new Date().getUTCMinutes();
  const getAdjustedDate = () =>
    new Date(Date.UTC(2022, 8, 12, getCurrentHour(), getCurrentMinute()));

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setTime(getAdjustedDate());
    const timer = setInterval(() => {
      setTime(getAdjustedDate());
    }, 30000);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <StyledTimeText
        x={xScale(time)}
        y={-20}
        fill={stroke}
      >{`Current time: ${time.toLocaleTimeString('en-GB', {
        hour: '2-digit',
        minute: '2-digit',
      })}`}</StyledTimeText>
      <path
        d={[
          'M',
          xScale(time),
          dimensions.height - margin.bottom - margin.top,
          'V',
          -5,
        ].join(' ')}
        fill="none"
        stroke={stroke}
        strokeWidth="2"
      />
      ;
    </g>
  );
};

export default CurrentTime;
