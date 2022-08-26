import React from 'react';
import styled from 'styled-components';

const StyledYAxisText = styled.text`
  text-anchor: end;
  transform: ${(props) => props.offset};
  font-weight: 600;
  font-size: 14px;
  alignment-baseline: central;
  fill: #c1c3c2;
`;

const YAxis = ({ dimensions, margin, scale, tickFormat, values }) => {
  const ticks = scale.nice().ticks(10);
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
    <g transform={`translate(${margin.left}, 0)`}>
      <path
        d={[
          'M',
          0,
          dimensions.height - margin.bottom,
          'H',
          0,
          'V',
          margin.top,
        ].join(' ')}
        fill="none"
        stroke="#C1C3C2"
      />

      {formattedTicks.map((item) => (
        <path
          key={item.value}
          transform={`translate(0, ${item.offset + margin.top})`}
          d={[
            'M',
            -8,
            0,
            'H',
            dimensions.width - margin.left - margin.right,
          ].join(' ')}
          fill="none"
          stroke="#6B6D6E"
        />
      ))}
      <path
        transform={`translate(0, ${scale(0) + margin.top})`}
        d={[
          'M',
          -8,
          0,
          'H',
          dimensions.width - margin.left - margin.right,
        ].join(' ')}
        fill="none"
        stroke="#C1C3C2"
      />
      {formattedTicks.map(({ value, offset }) => (
        <g key={value} transform={`translate(0, ${offset + margin.top})`}>
          <StyledYAxisText offset={`translateX(-15px)`}>
            {value}
          </StyledYAxisText>
        </g>
      ))}
    </g>
  );
};

export default YAxis;
