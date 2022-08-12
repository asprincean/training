import React from 'react';
import styled from 'styled-components';

const StyledTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  /*  width: 200px; */
`;

const StyledRow = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto;
  width: 100%;
`;

const StyledClosesText = styled.span`
  display: flex;
  color: white;
  margin: auto 1.2rem auto 0px;
  padding-bottom: 0.3rem;
  font-size: 0.8rem;
`;

const StyledCurrencyText = styled.span`
  display: flex;
  color: white;
  margin: 0px 1.2rem auto 0px;
  padding-bottom: 0.3rem;
  font-size: 0.8rem;
`;

const StyledColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledDetailsText = styled.span`
  display: flex;
  color: white;
  margin: auto 0px auto auto;
  padding-bottom: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const TooltipContents = ({ groupData }) => {
  
  return (
    <StyledTextContainer>
      <StyledRow>
        <StyledClosesText>Closes:</StyledClosesText>
        <StyledDetailsText>{groupData.time}</StyledDetailsText>
      </StyledRow>
      <StyledRow style={{ marginTop: '0.3rem' }}>
        <StyledCurrencyText>Currency:</StyledCurrencyText>
        <StyledColumn>
          {groupData.data.map((item) => (
            <StyledDetailsText key={item.title}>{item.title}</StyledDetailsText>
          ))}
        </StyledColumn>
      </StyledRow>
    </StyledTextContainer>
  );
};

export default TooltipContents;
