import React, { useState } from 'react';
import styled from 'styled-components';
/* import currencyList from './../data/kpiData'; */
import Diamond from './Diamond';
import useWebsocket from '../utils/useWebsocket';

function Timeline({ selectedCurrencyIds, setSelectedCurrencyIds }) {
  const { currencyList } = useWebsocket();
  // add function for formatting hour 09:00
  function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }
  // Set hours
  const hours = [
    { hour: 7, time: '07:00' },
    { hour: 9, time: '09:00' },
    { hour: 11, time: '11:00' },
    { hour: 13, time: '13:00' },
    { hour: 15, time: '15:00' },
    { hour: 17, time: '17:00' },
    { hour: 19, time: '19:00' },
    { hour: 21, time: '21:00' },
    { hour: 24, time: '23:59' },
  ];

  const [dateTime, setDateTime] = useState();

  // Create interval to set time every minute
  React.useEffect(() => {
    setDateTime(new Date());
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // get current time
  let hour = addZero(dateTime?.getHours());
  let minute = addZero(dateTime?.getMinutes());
  let currentTime = hour + ':' + minute;

  // set position for timelines
  const getTimePercentage = (hour, minute) => {
    return ((hour - 7) / 17 + minute / 60 / 17) * 100;
  };

  const groupedCurrencies = {};
  currencyList.forEach((item) => {
    const time = item.time;
    if (groupedCurrencies[time] === undefined) {
      groupedCurrencies[time] = [];
    }
    groupedCurrencies[time].push(item);
  });

  const groupedCurrencyList = [];
  for (const [key, value] of Object.entries(groupedCurrencies)) {
    groupedCurrencyList.push({ time: key, data: value });
  }
  return (
    <StyledWrapper>
      <StyledTimeLines>
        {hours.map((hour) => (
          <StyledHourContainer
            key={hour.hour}
            timeOffset={getTimePercentage(hour.hour, 0)}
          >
            <StyledHourLine />
            <StyledTime>{hour.time}</StyledTime>
          </StyledHourContainer>
        ))}
        {hour && minute ? (
          <StyledCurrentHourContainer
            currentTimeOffset={getTimePercentage(hour, minute)}
          >
            <CurrentTimeLine />
            <StyledCurrentTime>{currentTime}</StyledCurrentTime>
          </StyledCurrentHourContainer>
        ) : (
          <></>
        )}

        {groupedCurrencyList.map((item) => (
          <Diamond
            key={item.time}
            groupData={item}
            getTimePercentage={getTimePercentage}
            currentTime={currentTime}
            selectedCurrencyIds={selectedCurrencyIds}
            setSelectedCurrencyIds={setSelectedCurrencyIds}
          />
        ))}
      </StyledTimeLines>
    </StyledWrapper>
  );
}

export default Timeline;

const StyledWrapper = styled.div`
  width: 95vw;
  height: 37px;
  background-color: #1d262c;
  margin: 20px 0 30px 0;
  border: #d7d8d65e solid 1px;
`;

const StyledTimeLines = styled.div`
  display: flex;
  position: relative;
`;
const StyledHourLine = styled.div`
  height: 50px;
  width: 1px;
  background-color: #999ea2;
`;

const StyledTime = styled.p`
  font-size: 1rem;
  margin: 5px 0 0 0;
  position: relative;
  transform: translateX(-50%);
  color: #999ea2;
`;

const StyledCurrentTime = styled.p`
  font-size: 1rem;
  margin: 5px 0 0 0;
  position: relative;
  transform: translate(-16px, -40px);
  color: #ffbb33;
`;

const CurrentTimeLine = styled.div`
  position: absolute;
  height: 50px;
  width: 1.5px;
  background-color: #ffbb33;
  z-index: 200;
  transform: translateY(-12px);
`;

const StyledHourContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: ${(props) => `${props.timeOffset}%`};
  z-index: 100;
`;
const StyledCurrentHourContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: ${(props) => `${props.currentTimeOffset}%`};
  z-index: 100;
`;
