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
  width: 90px;
`;

const StyledDetailsText = styled.span`
 /*  display: flex; */
  color: white;
  /* margin: auto auto auto auto; */
  padding-bottom: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
  text-align: center;
  width: 75px;
`;

const TooltipContents = ({ tooltipData }) => {
  return (
    <StyledTextContainer>
      <StyledRow>
        <StyledDescText>Customer:</StyledDescText>
        <StyledDetailsText>{tooltipData.customer}</StyledDetailsText>
      </StyledRow>
      <StyledRow>
        <StyledDescText>Primary Value:</StyledDescText>
        <StyledDetailsText>
          {(tooltipData.primaryValue / 1000000).toFixed(1)}M
        </StyledDetailsText>
      </StyledRow>
      <StyledRow>
        <StyledDescText>Secondary Value:</StyledDescText>
        <StyledDetailsText>
          {(tooltipData.secondaryValue / 1000000).toFixed(1)}M
        </StyledDetailsText>
      </StyledRow>
    </StyledTextContainer>
  );
};

export default TooltipContents;
