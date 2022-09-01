import React, { useCallback } from 'react';
import styled from 'styled-components';
import * as d3 from 'd3';

const StyledPath = styled.path`
  pointer-events: none;
`;

const Line = ({
  bandWidth,
  margin,
  xScale,
  yScale,
  data,
  stroke,
  handleTooltipShow,
  handleTooltipHide,
}) => {
  const line = d3
    .line()
    .x((d) => xScale(d.time))
    .y((d) => yScale(d.credit - d.debit));

  const handleOnHover = useCallback(
    (e) => {
      console.log(e.target);
      if (handleTooltipShow) {
        handleTooltipShow(e, {
          time: data.time,
          credit: data.credit,
          debit: data.debit,
          balance: data.credit - data.debit,
        });
      }
    },
    [handleTooltipShow]
  );
  return (
    <g transform={`translate(${margin.left + bandWidth / 2}, ${margin.top})`}>
      <StyledPath
        d={line(data)}
        stroke={stroke}
        strokeWidth="2"
        fill={'transparent'}
        onMouseOver={handleOnHover}
        onMouseOut={handleTooltipHide}
      />
    </g>
  );
};

export default Line;
