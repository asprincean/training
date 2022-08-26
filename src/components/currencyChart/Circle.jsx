import React, { useCallback } from 'react';
import styled from 'styled-components';

const StyledCircle = styled.circle`
  transition: stroke-width 0.2s ease;
  cursor: pointer;
  :hover {
    stroke: red;
    stroke-width: 1px;
  }
`;

const Circle = ({
  bandWidth,
  xScale,
  yScale,
  data,
  fill,
  stroke,
  handleTooltipShow,
  handleTooltipHide,
}) => {
  const y = yScale(data.secondaryValue);
  const x = xScale(data.customer);

  const handleOnHover = useCallback(
    (e) => {
      if (handleTooltipShow) {
        handleTooltipShow(e, {
          customer: data.customer,
          primaryValue: data.primaryValue,
          secondaryValue: data.secondaryValue,
        });
      }
    },
    [handleTooltipShow, data]
  );

  return (
    <StyledCircle
      /* width={bandWidth}
      height={height} */
      r={8}
      cx={x}
      cy={y}
      fill={fill}
      stroke={stroke}
      onMouseOver={handleOnHover}
      onMouseOut={handleTooltipHide}
      transform={`translate(${bandWidth / 2}, 0)`}
    />
  );
};

export default Circle;
