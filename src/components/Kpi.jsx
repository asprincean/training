import styled from 'styled-components';
import numeral from 'numeral';


function Kpi({ currency, selectedCurrencyIds, setSelectedCurrencyIds }) {
  // Add function for formatting hour 09:00
  function addZero(i) {
    if (i < 10) {
      i = '0' + i;
    }
    return i;
  }
  // Get current time
  const date = new Date();
  let hour = addZero(date.getHours());
  let minutes = addZero(date.getMinutes());
  let currentTime = hour + ':' + minutes;
  const showTime = currency.time;

  // Display time and kpi styling by current hour
  let time;
  let borderColor;
  let opacity;
  let width;
  let height;
  if (showTime < currentTime) {
    time = 'Closed: ' + showTime;
    borderColor = '#1564B5';
    opacity = '0.6';
    width = '290px';
    height = '175px';
  } else if (showTime > currentTime) {
    time = 'Closes: ' + showTime;
    borderColor = '#00847f';
    width = '290px';
    height = '175px';
  } else {
    //Background Grey
  }

  if (selectedCurrencyIds && selectedCurrencyIds[0] === currency.id) {
    borderColor = '#ffff';
    width = '322px';
    height = '193px';
  }
  const handleClick = (e) => {
    e.preventDefault();
    setSelectedCurrencyIds([currency.id]);
  };

  return (
    <StyledWrapper
      onClick={handleClick}
      borderColor={borderColor}
      width={width}
      height={height}
      opacity={opacity}
    >
      <StyledRow>
        <StyledTitle>{currency.title}</StyledTitle>
        <StyledTime>{time}</StyledTime>
      </StyledRow>
      <StyledDivider />
      <StyledRow>
        <StyledText>Projected:</StyledText>
        <StyledNumber valueColor={currency.projected}>
          {numeral(currency.projected).format('(0,0)')}
        </StyledNumber>
      </StyledRow>
      <StyledRow>
        <StyledText>Actual:</StyledText>
        <StyledNumber valueColor={currency.actual}>
          {numeral(currency.actual).format('(0,0)')}
        </StyledNumber>
      </StyledRow>
      <StyledRow>
        <StyledText>Proj failing:</StyledText>
        <StyledNumber valueColor={currency.projFailing}>
          {numeral(currency.projFailing).format('(0,0)')}
        </StyledNumber>
      </StyledRow>
      <StyledRow>
        <StyledText>Act failing:</StyledText>
        <StyledNumber valueColor={currency.actFailing}>
          {numeral(currency.actFailing).format('(0,0)')}
        </StyledNumber>
      </StyledRow>
      <StyledRow>
        <StyledText style={{ textDecoration: 'none' }}>
          Transaction volume:
        </StyledText>
        <StyledNumber valueColor={currency.trVolume}>
          {numeral(currency.trVolume).format('(0,0)')}
        </StyledNumber>
      </StyledRow>
      
    </StyledWrapper>
  );
}

export default Kpi;
const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid ${(props) => props.borderColor};
  padding: 0 20px;
  min-width: 290px;
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  margin: auto 15px auto 0;
  box-shadow: 2px 2px 2px rgb(0 0 0 / 12%);
  transition: 0.3s;
  opacity: ${(props) => props.opacity};
  cursor: pointer;
  :hover {
    opacity: 0.6;
    transition: all 0.2s ease-out;
    box-shadow: 0px 4px 8px ${(props) => props.borderColor};
    top: -4px;
  }
`;

const StyledRow = styled.span`
  display: flex;
  justify-content: space-between;
`;
const StyledTitle = styled.h3`
  color: white;
  margin-bottom: 0;
`;
const StyledTime = styled.h3`
  color: white;
  margin-bottom: 0;
`;
const StyledDivider = styled.hr`
  height: 1px;
  border-width: 0;
  background-color: #767676;
`;

const StyledText = styled.p`
  margin: 0 0 5px 0;
  font-size: 1rem;
  text-decoration: underline;
`;

const StyledNumber = styled.p`
  margin: 0 0 5px 0;
  font-size: 1rem;
  color: ${(props) => (props.valueColor < 0 ? '#FF959D' : 'white')};
`;
