import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledRect = styled.rect`
  transition: stroke-width 0.2s ease;
  cursor: pointer;
  :hover {
    stroke: red;
    stroke-width: 1px;
  }
`;

const Bar = ({
  bandWidth,
  xScale,
  yScale,
  data,
  fill,
  stroke,
  orientation,
  handleTooltipShow,
  handleTooltipHide,
}) => {
  let height;
  let y;
  let x;

  if (orientation === 'top') {
    height = yScale(0) - yScale(data.credit);
    y = yScale(data.credit);
    x = xScale(data.time);
  } else {
    height = yScale(-data.debit) - yScale(0);
    y = yScale(0);
    x = xScale(data.time);
  }

  const handleOnHover = useCallback(
    (e) => {
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
    <StyledRect
      width={bandWidth}
      height={height}
      x={x}
      y={y}
      fill={fill}
      stroke={stroke}
      onMouseOver={handleOnHover}
      onMouseOut={handleTooltipHide}
    />
  );
};

export default Bar;
