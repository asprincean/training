import React from 'react';
import styled from 'styled-components';

const StyledXAxisText = styled.text`
  text-anchor: middle;
  transform: ${(props) => props.offset};
  font-weight: 600;
  font-size: 14px;
  alignment-baseline: central;
  fill: #c1c3c2;
`;

const XAxis = ({ dimensions, margin, scale, tickFormat, values }) => {
  const ticks = scale
    .nice()
    .ticks(10)
    .filter((item) => item.getHours() % 2 === 0); // return even hours

  const formattedTicks = ticks.map((item) => {
    if (item === 0) {
      return {
        value: 0,
        offset: scale(item),
      };
    }
    return {
      value: tickFormat(item),
      offset: scale(item),
    };
  });

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      <path
        d={[
          'M',
          -8,
          dimensions.height - margin.bottom - margin.top,
          'H',
          dimensions.width - margin.right - margin.left,
        ].join(' ')}
        fill="none"
        stroke="#C1C3C2"
      />

      {formattedTicks.map((item) => (
        <path
          key={item.value}
          transform={`translate(${item.offset}, 0)`}
          d={[
            'M',
            0,
            0,
            'V',
            dimensions.height - margin.bottom - margin.top + 8,
          ].join(' ')}
          fill="none"
          stroke="#6B6D6E"
        />
      ))}

      {formattedTicks.map((item) => (
        <g
          key={item.value}
          transform={`translate(${item.offset}, ${
            dimensions.height - margin.top - margin.bottom
          })`}
        >
          <StyledXAxisText offset={`translateY(20px)`}>
            {item.value}
          </StyledXAxisText>
        </g>
      ))}
    </g>
  );
};

export default XAxis;
