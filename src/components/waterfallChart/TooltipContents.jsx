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

const StyledDescText = styled.span`
  display: flex;
  color: white;
  margin: auto 1.2rem auto 0px;
  padding-bottom: 0.3rem;
  font-size: 0.8rem;
  width: 40px;
`;

const StyledDetailsText = styled.span`
 /*  display: flex; */
  color: white;
  /* margin: auto auto auto auto; */
  padding-bottom: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  width: 65px;
`;

const TooltipContents = ({ tooltipData }) => {
  return (
    <StyledTextContainer>
      <StyledRow>
        <StyledDescText>Account:</StyledDescText>
        <StyledDetailsText>{tooltipData.account}</StyledDetailsText>
      </StyledRow>
      <StyledRow>
        <StyledDescText>Change:</StyledDescText>
        <StyledDetailsText>
          {(tooltipData.change / 1000000).toFixed(1)}M
        </StyledDetailsText>
      </StyledRow>
      <StyledRow>
        <StyledDescText>Balance:</StyledDescText>
        <StyledDetailsText>
          {(tooltipData.balance / 1000000).toFixed(1)}M
        </StyledDetailsText>
      </StyledRow>
    </StyledTextContainer>
  );
};

export default TooltipContents;
