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

const StyledDetailsText = styled.span`
  display: flex;
  color: white;
  margin: auto 0px auto auto;
  padding-bottom: 0.3rem;
  font-size: 0.8rem;
  font-weight: 600;
`;

const TooltipContents = ({ tooltipData }) => {
  return (
    <StyledTextContainer>
      <StyledRow>
        <StyledClosesText>Time:</StyledClosesText>
        <StyledDetailsText>
          {tooltipData.time?.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </StyledDetailsText>
      </StyledRow>
      <StyledRow>
        <StyledClosesText>Credit:</StyledClosesText>
        <StyledDetailsText>
          {(tooltipData.credit / 1000000).toFixed(1)}M
        </StyledDetailsText>
      </StyledRow>
      <StyledRow>
        <StyledClosesText>Debit:</StyledClosesText>
        <StyledDetailsText>{(tooltipData.debit / 1000000).toFixed(1)}M</StyledDetailsText>
      </StyledRow>
      <StyledRow>
        <StyledClosesText>Balance:</StyledClosesText>
        <StyledDetailsText>{(tooltipData.balance / 1000000).toFixed(1)}M</StyledDetailsText>
      </StyledRow>
    </StyledTextContainer>
  );
};

export default TooltipContents;
