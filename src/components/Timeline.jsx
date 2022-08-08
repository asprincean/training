import styled from 'styled-components';
import moment from 'moment';

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
    { id: 1, time: '07:00' },
    { id: 2, time: '09:00' },
    { id: 3, time: '11:00' },
    { id: 4, time: '13:00' },
    { id: 5, time: '15:00' },
    { id: 6, time: '17:00' },
    { id: 7, time: '19:00' },
    { id: 8, time: '21:00' },
    { id: 9, time: '23:59' },
  ];
  // get current time
  const date = new Date();
  let hour = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  let currentTime = hour + ':' + minutes;
  const displayHour = '09:00';
  // display time and line styling by current hour
  let time;
  let color;
  if (displayHour === currentTime) {
    time = currentTime;
    color = '#FFBB33';
  } else if (displayHour !== currentTime) {
    time = displayHour;
    color = '#d7d8d6';
  }
  return (
    <StyledWrapper>
      <StyledTimeLines color={color} time={time}>
        {hours.map((hour, id) => (
          <div key={id} style={{ width: '0.5rem' }}>
            <StyledHourLine />
            <StyledTime currentTime={currentTime}>{hour.time}</StyledTime>
          </div>
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
  margin-bottom: 30px;
`;

const StyledTimeLines = styled.div`
  display: flex;
  justify-content: space-between;
`;
const StyledHourLine = styled.span`
  border-left: 1px solid ${(props) => props.color};
  font-size: 2.5rem;
`;

const StyledTime = styled.p`
  color: ${(props) => props.color};
  font-size: 1rem;
  margin: 5px 0 0 0;
  position: relative;
  right: 15px;
`;
