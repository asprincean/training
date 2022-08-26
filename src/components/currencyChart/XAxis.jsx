import React from 'react';
import styled from 'styled-components';

const StyledXAxisText = styled.text`
  text-anchor: end;
  transform: ${(props) => props.offset};
  font-weight: 600;
  font-size: 16px;
  alignment-baseline: central;
  fill: #c1c3c2;
  /* rotate: -45deg; */
`;

const XAxis = ({
  dimensions,
  margin,
  scale,
  tickFormat,
  values,
  bandWidth,
}) => {
  const ticks = values;

  const formattedTicks = ticks.map((item) => ({
    value: tickFormat(item),
    offset: scale(item),
  }));

  return (
    <g transform={`translate(${margin.left}, ${margin.top})`}>
      {formattedTicks.map((item, index) => (
        <g
          key={`${item.value}-${index}`}
          transform={`translate(${item.offset}, ${
            dimensions.height - margin.top - margin.bottom
          })`}
        >
          <StyledXAxisText
            offset={`translate(${bandWidth / 2 - 5}px, 15px) rotate(-45deg)`}
          >
            {item.value}
          </StyledXAxisText>
        </g>
      ))}
    </g>
  );
};

export default XAxis;
