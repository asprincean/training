import React, { useRef } from 'react';
import styled from 'styled-components';
import useResizeObserver from '../../utils/useResizeObserver';
import useChartTooltip from '../../utils/useChartTooltip';
import * as d3 from 'd3';

import YAxis from './YAxis';
import XAxis from './XAxis';
import Bar from './Bar';
import Line from './Line';
import CurrentTime from './CurrentTime';
import ChartTooltip from '../ChartTooltip';
import TooltipContents from './TooltipContents';
import Legend from './Legend';
import AxisLabel from './AxisLabel';
import InfoIcon from '../../assets/InfoIcon';
import ExpandIcon from '../../assets/ExpandIcon';
import DotsIcon from '../../assets/DotsIcon';

const StyledOuterContainer = styled.div`
  display: flex;
  flex-direction: column;

  height: 650px;
  margin: 1rem 12px 12px 12px;
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

const StyledChartContainer = styled.div`
  display: flex;
  height: 550px;
  width: 100%;
  position: relative;
  background-color: #253038;
  box-shadow: -1px 1px 1px 1px #394b56 inset;
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

const ITF_Barchart = ({ data }) => {
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

  const getStartTime = () => {
    const startTime = new Date(data[0].time);
    startTime.setUTCMinutes(0);
    return new Date(startTime.setUTCHours(startTime.getUTCHours() - 2));
  };

  const getEndTime = () => {
    const startTime = new Date(data[0].time);
    startTime.setUTCMinutes(0);
    return new Date(startTime.setUTCHours(startTime.getUTCHours() + 15));
  };

  /* const xValues = data.map((item) => item.time);
  const yValuesCredit = data.map((item) => item.credit);
  const yValuesDebit = data.map((item) => item.debit); */

  const xScale = d3
    .scaleUtc()
    .domain([getStartTime(), getEndTime()])
    .range([0, innerWidthChart - innerWidthChart / 15]);

  const yMinValue = d3.min(data, (d) => -d.debit);

  const yMaxValue = d3.max(data, (d) => d.credit);

  const yScale = d3
    .scaleLinear()
    .domain([yMinValue, yMaxValue])
    .range([innerHeightChart, 0]);

  const yTickFormat = (d) => `${d / 1000000}M`;

  const xTickFormat = (d) =>
    d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });

  const ticks = xScale
    .nice()
    .ticks(10)
    .filter((item) => item.getHours() % 2 === 0);

  const bandWidth = (xScale(ticks[1]) - xScale(ticks[0])) / 5 - 12;

  const { tooltipData, handleTooltipShow, handleTooltipHide } =
    useChartTooltip();

  return (
    <StyledOuterContainer>
      <StyledNavBar>
        <StyledTab>
          <StyledTabText>Intraday transaction flow</StyledTabText>
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
              {data.map((item, index) => (
                <g key={`Bars--${index}`}>
                  <Bar
                    key={`Bar-top-${index}`}
                    orientation={'top'}
                    bandWidth={bandWidth}
                    xScale={xScale}
                    yScale={yScale}
                    data={item}
                    fill={'#2580DC'}
                    handleTooltipShow={handleTooltipShow}
                    handleTooltipHide={handleTooltipHide}
                    /* stroke={getStroke(index)} */
                  />

                  <Bar
                    key={`Bar-bottom-${index}`}
                    orientation={'bottom'}
                    bandWidth={bandWidth}
                    xScale={xScale}
                    yScale={yScale}
                    data={item}
                    fill={'#E67310'}
                    handleTooltipShow={handleTooltipShow}
                    handleTooltipHide={handleTooltipHide}
                    /* stroke={getStroke(index)} */
                  />
                </g>
              ))}
            </g>
            <Line
              bandWidth={bandWidth}
              margin={margin}
              xScale={xScale}
              yScale={yScale}
              data={data}
              stroke={'#F2F7FD'}
            />
            <CurrentTime
              dimensions={dimensions}
              margin={margin}
              xScale={xScale}
              stroke={'#FFBB33'}
            />
          </svg>
        ) : (
          <></>
        )}
        <ChartTooltip
          wrapperRef={wrapperRef}
          tooltipData={tooltipData}
          tooltipContents={<TooltipContents tooltipData={tooltipData} />}
          orientation="left"
        />
        <Legend />
        <AxisLabel
          dimensions={dimensions}
          margin={margin}
          color={'#c1c3c2'}
          position={'left'}
          text={'Balance'}
        />
        <AxisLabel
          dimensions={dimensions}
          margin={margin}
          color={'#c1c3c2'}
          position={'bottom'}
          text={'Time'}
        />
      </StyledChartContainer>
    </StyledOuterContainer>
  );
};

export default ITF_Barchart;
