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
  handleTooltipShow,
  handleTooltipHide,
 
}) => {

  const height = yScale(0) - yScale(data.change);
  const y = yScale(data.balance);
  const x = xScale(data.account);

  const getHeight = () => {
    if (height <= 0) {
      return -height;
    }
    return height;
  };

  const getY = () => {
    if (height <= 0) {
      return y + height;
    }
    return y;
  };

  const handleOnHover = useCallback(
    (e) => {
      if (handleTooltipShow) {
        handleTooltipShow(e, {
          account: data.account,
          change: data.change,
          balance: data.balance,
        });
      }
    },
    [handleTooltipShow, data]
  );

  return (
    <StyledRect
      width={bandWidth}
      height={getHeight()}
      x={x}
      y={getY()}
      fill={fill(data)}
      stroke={stroke}
      onMouseOver={handleOnHover}
      onMouseOut={handleTooltipHide}
    />
  );
};

export default Bar;
