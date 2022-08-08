import React, { useState } from 'react';
import styled from 'styled-components';

function Timeline() {
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

  React.useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // get current time

  let hour = addZero(dateTime?.getHours());
  let minute = addZero(dateTime?.getMinutes());
  let currentTime = hour + ':' + minute;
  console.log(currentTime);
  console.log(dateTime);

  const getTimePercentage = (hour, minute) => {
    return ((hour - 7) / 17 + minute / 60 / 17) * 100;
  };

  return (
    <StyledWrapper>
      <StyledTimeLines>
        {hours.map((hour) => (
          <StyledHourContainer
            key={hour.hour}
            timeOffset={getTimePercentage(hour.hour, 0)}
          >
            <StyledHourLine />
            <StyledTime currentTime={currentTime}>{hour.time}</StyledTime>
          </StyledHourContainer>
        ))}
        {hour && minute ? (
          <CurrentTimeLine
            currentTimeOffset={getTimePercentage(hour, minute)}
          />
        ) : (
          <></>
        )}
      </StyledTimeLines>
    </StyledWrapper>
  );
}

export default Timeline;

const StyledWrapper = styled.div`
  width: 95vw;
  height: 37px;
  background-color: #1d262c;
  margin-bottom: 30px;
  border: #d7d8d65e solid 1px;
`;

const StyledTimeLines = styled.div`
  display: flex;

  position: relative;
`;
const StyledHourLine = styled.div`
  height: 50px;
  width: 1px;
  background-color: #d7d8d6;
`;

const StyledTime = styled.p`
  color: ${(props) => props.color};
  font-size: 1rem;
  margin: 5px 0 0 0;
  position: relative;
  transform: translateX(-50%);
`;

const CurrentTimeLine = styled.div`
  position: absolute;
  left: ${(props) => `${props.currentTimeOffset}%`};
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
  position: absolute;
  left: ${(props) => `${props.timeOffset}%`};
  z-index: 100;
`;
