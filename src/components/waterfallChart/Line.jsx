import React from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const StyledPath = styled.path`
  pointer-events: none;
`;

const Line = ({ bandWidth, margin, xScale, yScale, data, stroke }) => {
  const line = d3
    .line()
    .x((d) => xScale(d.customer))
    .y((d) => yScale(d.secondaryValue));

  return (
    <g transform={`translate(${margin.left + bandWidth / 2}, ${margin.top})`}>
      <StyledPath
        d={line(data)}
        stroke={stroke}
        strokeWidth="3"
        fill={'transparent'}
      />
    </g>
  );
};

export default Line;
