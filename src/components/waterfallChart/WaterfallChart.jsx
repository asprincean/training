import React, { useRef } from 'react';
import styled from 'styled-components';
import useResizeObserver from '../../utils/useResizeObserver';
import useChartTooltip from '../../utils/useChartTooltip';
import * as d3 from 'd3';

import YAxis from './YAxis';
import XAxis from './XAxis';
import Bar from './Bar';
import Connector from './Connector';
import ChartTooltip from '../ChartTooltip';
import TooltipContents from './TooltipContents';
import Legend from './Legend';
import AxisLabel from './AxisLabel';
import InfoIcon from '../../assets/InfoIcon';
import ExpandIcon from '../../assets/ExpandIcon';
import DotsIcon from '../../assets/DotsIcon';
import XAxisTickLabel from './XAxisTickLabel';

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

const WaterfallChart = ({ data }) => {
  const wrapperRef = useRef();
  const dimensions = useResizeObserver(wrapperRef);
  const margin = {
    top: 65,
    right: 20,
    bottom: 100,
    left: 100,
  };

  const innerHeightChart = dimensions?.height - margin.top - margin.bottom;
  const innerWidthChart = dimensions?.width - margin.left - margin.right;

  const arrayData = [];
  for (const item in data) {
    arrayData.push({ account: item, balance: data[item] });
  }

  const filteredArrayData = arrayData.filter(
    (item) => item.account !== 'End of day balance'
  );

  const cumulativeData = [];
  let cumulativeBalance = 0;
  for (let i = 0; i < filteredArrayData.length; i += 1) {
    cumulativeBalance += filteredArrayData[i].balance;
    cumulativeData[i] = {
      account: filteredArrayData[i].account,
      balance: cumulativeBalance,
      change: filteredArrayData[i].balance,
    };
  }

  cumulativeData.push({
    account: 'End of day balance',
    balance: arrayData[arrayData.length - 1].balance,
    change: arrayData[arrayData.length - 1].balance,
  });

  const xValues = [];
  for (const item in data) {
    xValues.push(item);
  }
  const yValues = cumulativeData.map((item) => item.balance);

  const xScale = d3
    .scaleBand()
    .domain(xValues)
    .range([0, innerWidthChart])
    .paddingOuter([0.25])
    .paddingInner([0.5]);

  const yMinValue = d3.min(yValues, (d) => d);

  const yMaxValue = d3.max(yValues, (d) => d);

  const yScale = d3
    .scaleLinear()
    .domain([
      Math.floor((yMinValue - 3000000) / 1000000) * 1000000,
      Math.ceil((yMaxValue + 11000000) / 1000000) * 1000000,
    ])
    .range([innerHeightChart, 0]);

  const yTickFormat = (d) => `${d / 1000000}M`;

  const xTickFormat = (d) => {
    if (d.length > 8) {
      return `${d.slice(0, 8)}`;
    }
    return d;
  };

  const bandWidth = xScale.bandwidth();

  const { tooltipData, handleTooltipShow, handleTooltipHide } =
    useChartTooltip();

  const getBarFill = (data) => {
    if (
      data.account === 'Start of day balance' ||
      data.account === 'End of day balance'
    ) {
      return '#4D6474';
    }
    if (data.change <= 0) {
      return '#E67310';
    }
    return '#2580DC';
  };

  const connectorWidth = xScale.step() - bandWidth;
  const lastIndex = cumulativeData.length - 1;

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
                scale={xScale}
                tickFormat={xTickFormat}
                values={xValues}
                bandWidth={bandWidth}
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
                {cumulativeData.map((item, index) => (
                  <g key={`Bars-${index}`}>
                    <Bar
                      orientation={'top'}
                      bandWidth={bandWidth}
                      xScale={xScale}
                      yScale={yScale}
                      data={item}
                      fill={getBarFill}
                      index={index}
                      handleTooltipShow={handleTooltipShow}
                      handleTooltipHide={handleTooltipHide}
                    />
                  </g>
                ))}
              </g>
              <g transform={`translate(${margin.left}, ${margin.top})`}>
                {cumulativeData.map((item, index) => (
                  <g key={`Connectors-${index}`}>
                    <Connector
                      xScale={xScale}
                      yScale={yScale}
                      data={item}
                      index={index}
                      connectorWidth={connectorWidth}
                      bandWidth={bandWidth}
                      lastIndex={lastIndex}
                    />
                  </g>
                ))}
              </g>
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
          {cumulativeData.map((item) => (
            <XAxisTickLabel
              key={`xaxis-label-${item.account}`}
              dimensions={dimensions}
              margin={margin}
              xScale={xScale}
              bandWidth={bandWidth}
              value={item.account}
            />
          ))}
        </StyledChartContainer>
        <StyledCustomLabel>Key Accounts</StyledCustomLabel>
      </StyledInnerContainer>
    </StyledOuterContainer>
  );
};

export default WaterfallChart;
