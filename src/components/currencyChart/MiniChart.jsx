import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import useResizeObserver from '../../utils/useResizeObserver';
import * as d3 from 'd3';
import Bar from './Bar';
import Brush from './Brush';
import Line from './Line';
import useDraggable from '../../utils/useDraggable';

const StyledChartContainer = styled.div`
  display: flex;
  margin: 1rem 20px auto auto;
  height: 70px;
  width: ${(props) => `${props.width}px`};
  position: relative;
  background-color: #253038;
  border: 2px solid #767676;
`;

const StyledOverlayLeft = styled.div`
  height: ${(props) => `${props.height}px`};
  display: flex;
  margin: auto;
  position: absolute;
  left: 0;
  background-color: #80808040;
`;

const StyledOverlayRight = styled.div`
  height: ${(props) => `${props.height}px`};
  display: flex;
  margin: auto;
  position: absolute;
  right: 0;
  background-color: #80808040;
`;

const MiniChart = ({
  data,
  width,
  setSelectionRange,
  brushWidth,
  getBarFill,
}) => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const margin = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  };

  const innerHeightChart = dimensions?.height - margin.top - margin.bottom;
  const innerWidthChart = dimensions?.width - margin.left - margin.right;

  const xValues = data.map((item) => item.customer);
  const yValuesPrimary = data.map((item) => item.primaryValue);
  const yValuesSecondary = data.map((item) => item.secondaryValue);
  const yValuesCombined = [...yValuesPrimary, yValuesSecondary];

  const xScale = d3
    .scaleBand()
    .domain(xValues)
    .range([0, innerWidthChart])
    .paddingOuter([0.25])
    .paddingInner([0.5]);

  /*  const yMinValue = d3.min(yValuesCombined, (d) => d); */

  const yMaxValue = d3.max(yValuesCombined, (d) => d);

  const yScale = d3
    .scaleLinear()
    .domain([0, yMaxValue + 2000000])
    .range([innerHeightChart, 0]);

  const bandWidth = xScale.bandwidth();

  const overlayLeftRef = useRef();
  const overlayRightRef = useRef();

  const { handleMouseDown, brushRef, position } = useDraggable({
    maxX: innerWidthChart,
    overlayLeftRef,
    overlayRightRef,
  });

  useEffect(() => {
    setSelectionRange({ start: position.x, end: position.x + brushWidth });
  }, [position, brushWidth, setSelectionRange]);

  return (
    <StyledChartContainer width={width} ref={wrapperRef}>
      {dimensions ? (
        <svg style={{ width: '100%' }}>
          <g transform={`translate(${margin.left}, ${margin.top})`}>
            {data.map((item, index) => (
              <g key={`Mini-Bars-Currency-${index}`}>
                <Bar
                  orientation={'top'}
                  bandWidth={bandWidth}
                  xScale={xScale}
                  yScale={yScale}
                  data={item}
                  fill={getBarFill(index)}
                  miniChart
                />
              </g>
            ))}
            <Line
              bandWidth={bandWidth}
              margin={margin}
              xScale={xScale}
              yScale={yScale}
              data={data}
              stroke={'#E67310'}
            />
          </g>
        </svg>
      ) : (
        <></>
      )}
      {dimensions ? (
        <>
          <StyledOverlayLeft ref={overlayLeftRef} height={70} />
          <Brush
            wrapperRef={wrapperRef}
            height={70}
            width={brushWidth}
            brushRef={brushRef}
            handleMouseDown={handleMouseDown}
          />
          <StyledOverlayRight ref={overlayRightRef} height={70} />
        </>
      ) : (
        <></>
      )}
    </StyledChartContainer>
  );
};

export default MiniChart;
