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

const StyledText = styled.text`
  font-size: 20px;
  font-weight: 600;
  text-anchor: middle;
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
  index,
  miniChart,
}) => {

  const height = yScale(0) - yScale(data.primaryValue);
  const y = yScale(data.primaryValue);
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

  const getFill = () => {
    if (index < 5) {
      return '#1d262c';
    }
    return 'white';
  };

  const getTextHeight = () => {
    if (height < 50 + 20) {
      return yScale(0) - height / 2;
    }
    return yScale(0) - 50;
  };

  return (
    <>
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
      {miniChart ? (
        <></>
      ) : (
        <StyledText fill={getFill()} x={x + bandWidth / 2} y={getTextHeight()}>
          {(data.primaryValue / 1000000).toFixed(0)}
        </StyledText>
      )}
    </>
  );
};

export default Bar;
