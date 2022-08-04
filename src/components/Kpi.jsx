import styled from 'styled-components';
import numeral from 'numeral';
import { MdOpacity } from 'react-icons/md';

function Kpi({ currency }) {
  const hour = new Date();
  const current = hour.getHours() + ':' + hour.getMinutes();
  const showTime = currency.time;
  console.log(current);
  let time;
  let borderColor;
  let opacity;
  if (showTime < current) {
    time = 'Closed: ' + showTime;
    borderColor = '#1564B5';
    opacity = '0.6';
  } else if (showTime > current) {
    time = 'Closes: ' + showTime;
    borderColor = '#00847f';
  }

  console.log(borderColor);
  return (
    <StyledWrapper borderColor={borderColor} opacity={opacity}>
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
  display: inline-block;
  border: 3px solid ${(props) => props.borderColor};
  padding: 0 20px;
  width: 290px;
  height: 175px;
  margin: 0 15px 0 0;
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
