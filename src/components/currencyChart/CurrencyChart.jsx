import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import useResizeObserver from '../../utils/useResizeObserver';
import useChartTooltip from '../../utils/useChartTooltip';
import * as d3 from 'd3';

import YAxis from './YAxis';
import XAxis from './XAxis';
import Bar from './Bar';
import Circle from './Circle';
import Line from './Line';
import ChartTooltip from '../ChartTooltip';
import TooltipContents from './TooltipContents';
import Legend from './Legend';
import AxisLabel from './AxisLabel';
import InfoIcon from '../../assets/InfoIcon';
import ExpandIcon from '../../assets/ExpandIcon';
import DotsIcon from '../../assets/DotsIcon';
import MiniChart from './MiniChart';

const StyledOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 1rem 12px 1rem 12px;
`;

const StyledNavBar = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 45px;
  box-shadow: -1px 1px 1px 1px #394b56 inset;
`;

const StyledTab = styled.div`
  display: flex;
  height: 50px;
  width: 250px;
  background-color: #253038;
  z-index: 500;
  box-shadow: 0px 5px 0px 0px #db0011 inset;
`;

const StyledTabText = styled.span`
  display: flex;
  margin: auto;
  color: #c8cbcd;
  font-size: 18px;
`;

const StyledInnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #253038;
  box-shadow: -1px 1px 1px 1px #394b56 inset;
`;

const StyledChartContainer = styled.div`
  display: flex;
  height: 550px;
  width: 100%;
  /* position: relative;
  background-color: #253038;
  box-shadow: -1px 1px 1px 1px #394b56 inset; */
`;

const StyledIconContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 0px auto auto;
  height: 100%;
`;

const StyledIconSquare = styled.div`
  height: 31px;
  width: 31px;
  border: 2px solid #c8cbcd;
  border-radius: 2px;
  margin: auto 8px auto auto;
  display: flex;
  transform: translateY(1px);
  transition: all 0.2s ease-in-out;
  transform-origin: center;
  cursor: pointer;
  :hover {
    transform: scale(1.06) translateY(1px);
  }
`;

const StyledInfoIcon = styled(InfoIcon)`
  height: 22px;
  width: 22px;
  margin: auto;
  display: flex;
  path {
    fill: #c8cbcd;
  }
`;

const StyledExpandIcon = styled(ExpandIcon)`
  height: 22px;
  width: 22px;
  margin: auto;
  display: flex;
  path {
    fill: #c8cbcd;
  }
`;

const StyledDotsIcon = styled(DotsIcon)`
  height: 22px;
  width: 22px;
  margin: auto;
  display: flex;
  svg {
    height: 22px;
    width: 22px;
  }
  path {
    fill: #c8cbcd;
  }
`;

const StyledCustomLabel = styled.span`
  font-size: 18px;
  margin: 1rem auto 1rem auto;
  color: #c1c3c2;
`;

const CurrencyChart = ({ data }) => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const margin = {
    top: 65,
    right: 20,
    bottom: 75,
    left: 100,
  };

  const innerHeightChart = dimensions?.height - margin.top - margin.bottom;
  const innerWidthChart = dimensions?.width - margin.left - margin.right;

  const sortedData = data.sort((a, b) =>
    d3.descending(a.primaryValue, b.primaryValue)
  );

  const xValues = sortedData.map((item) => item.customer);
  const yValuesPrimary = sortedData.map((item) => item.primaryValue);
  const yValuesSecondary = sortedData.map((item) => item.secondaryValue);
  const yValuesCombined = [...yValuesPrimary, yValuesSecondary];

  const xScale = d3
    .scaleBand()
    .domain(xValues)
    .range([0, innerWidthChart])
    .paddingOuter([0.25])
    .paddingInner([0.5]);

  /* const yMinValue = d3.min(yValuesCombined, (d) => d); */

  const yMaxValue = d3.max(yValuesCombined, (d) => d);

  const yScale = d3
    .scaleLinear()
    .domain([0, yMaxValue + 2000000])
    .range([innerHeightChart, 0]);

  const yTickFormat = (d) => `${d / 1000000}M`;

  const xTickFormat = (d) => {
    if (d.length > 8) {
      return `${d.slice(0, 8)}...`;
    }
    return d;
  };

  const bandWidth = xScale.bandwidth();

  const { tooltipData, handleTooltipShow, handleTooltipHide } =
    useChartTooltip();

  const [selectionRange, setSelectionRange] = useState({ start: 0, end: 0 });

  const scaleBandInvertStart = (value) => {
    var domain = xScale.domain();
    var paddingOuter = xScale(domain[0]);
    var eachBand = xScale.step();

    var index = Math.floor((value + bandWidth - paddingOuter) / eachBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };

  const scaleBandInvertEnd = (value) => {
    var domain = xScale.domain();
    var paddingOuter = xScale(domain[0]);
    var eachBand = xScale.step();

    var index = Math.floor((value + bandWidth * 2 - paddingOuter) / eachBand);
    return domain[Math.max(0, Math.min(index, domain.length - 1))];
  };
  const brushBars = 12;
  const brushWidth = brushBars * xScale.step();

  const startingSelectionIndex = xValues.indexOf(
    scaleBandInvertStart(selectionRange.start)
  );
  const endingSelectionIndex = xValues.indexOf(scaleBandInvertEnd(brushWidth));

  const selectedData = sortedData.slice(
    startingSelectionIndex,
    startingSelectionIndex + endingSelectionIndex
  );

  const selectedXValues = selectedData.map((item) => item.customer);

  const xScaleSelected = d3
    .scaleBand()
    .domain(selectedXValues)
    .range([0, innerWidthChart])
    .paddingOuter([0.25])
    .paddingInner([0.5]);

  const bandWidthSelected = xScaleSelected.bandwidth();

  const getBarFill = (index) => {
    if (index < 5) {
      return '#FFBB33';
    }
    return '#008580';
  };

  return (
    <StyledOuterContainer>
      <StyledNavBar>
        <StyledTab>
          <StyledTabText>Currency chart</StyledTabText>
        </StyledTab>
        <StyledIconContainer>
          <StyledIconSquare>
            <StyledInfoIcon className="className" />
          </StyledIconSquare>
          <StyledIconSquare>
            <StyledExpandIcon className="className" />
          </StyledIconSquare>
          <StyledIconSquare>
            <StyledDotsIcon className="className" />
          </StyledIconSquare>
        </StyledIconContainer>
      </StyledNavBar>
      <StyledInnerContainer>
        <StyledChartContainer ref={wrapperRef}>
          {dimensions ? (
            <svg style={{ width: '100%' }}>
              <YAxis
                dimensions={dimensions}
                margin={margin}
                scale={yScale}
                tickFormat={yTickFormat}
              />
              <XAxis
                dimensions={dimensions}
                margin={margin}
                scale={xScaleSelected}
                tickFormat={xTickFormat}
                values={selectedXValues}
                bandWidth={bandWidthSelected}
              />
              <g transform={`translate(${margin.left}, 0)`}>
                {/* Add additional axis line to account for svg ordering issue */}
                <path
                  d={[
                    'M',
                    0,
                    dimensions.height - margin.bottom + 8,
                    'H',
                    0,
                    'V',
                    margin.top,
                  ].join(' ')}
                  fill="none"
                  stroke="#C1C3C2"
                />
              </g>

              <g transform={`translate(${margin.left}, ${margin.top})`}>
                {selectedData.map((item, index) => (
                  <g key={`Bars-Currency-${index}`}>
                    <Bar
                      orientation={'top'}
                      bandWidth={bandWidthSelected}
                      xScale={xScaleSelected}
                      yScale={yScale}
                      data={item}
                      fill={getBarFill(index)}
                      index={index}
                      handleTooltipShow={handleTooltipShow}
                      handleTooltipHide={handleTooltipHide}
                    />
                  </g>
                ))}
              </g>

              <g transform={`translate(${margin.left}, ${margin.top})`}>
                {selectedData.map((item, index) => (
                  <g key={`Circles-Currency-${index}`}>
                    <Circle
                      orientation={'top'}
                      bandWidth={bandWidthSelected}
                      xScale={xScaleSelected}
                      yScale={yScale}
                      data={item}
                      fill={'#834EFF'}
                      index={index}
                      handleTooltipShow={handleTooltipShow}
                      handleTooltipHide={handleTooltipHide}
                    />
                  </g>
                ))}
              </g>

              <Line
                bandWidth={bandWidthSelected}
                margin={margin}
                xScale={xScaleSelected}
                yScale={yScale}
                data={selectedData}
                stroke={'#834EFF'}
              />
            </svg>
          ) : (
            <></>
          )}
          <ChartTooltip
            wrapperRef={wrapperRef}
            tooltipData={tooltipData}
            tooltipContents={<TooltipContents tooltipData={tooltipData} />}
            orientation="bottom"
            gap={10}
          />
          <Legend />
          <AxisLabel
            dimensions={dimensions}
            margin={margin}
            color={'#c1c3c2'}
            position={'left'}
            text={'Balance'}
          />
        </StyledChartContainer>
        {dimensions ? (
          <MiniChart
            width={innerWidthChart}
            data={sortedData}
            setSelectionRange={setSelectionRange}
            brushWidth={brushWidth}
            getBarFill={getBarFill}
          />
        ) : (
          <></>
        )}
        <StyledCustomLabel>Customer Names</StyledCustomLabel>
      </StyledInnerContainer>
    </StyledOuterContainer>
  );
};

export default CurrencyChart;
