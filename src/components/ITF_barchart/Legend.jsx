import React from 'react';
import styled from 'styled-components';

const StyledLegendContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 15px;
  right: 15px;
`;

const StyledLegendItem = styled.div`
  display: flex;
  flex-direction: row;
  margin: auto 15px auto auto;
`;

const StyledSquare = styled.div`
  margin: auto 5px auto auto;
  height: 10px;
  width: 10px;
  background-color: ${(props) => props.color};
`;

const StyledLine = styled.div`
  margin: auto 5px auto auto;
  height: 2px;
  width: 12px;
  background-color: ${(props) => props.color};
`;

const StyledText = styled.span`
  margin: auto;
  color: #c8cbcd;
  font-size: 16px;
`;

const Legend = () => {
  return (
    <StyledLegendContainer>
      <StyledLegendItem>
        <StyledSquare color="#2580DC" />
        <StyledText>Credits</StyledText>
      </StyledLegendItem>
      <StyledLegendItem>
        <StyledSquare color="#E67310" />
        <StyledText>Debits</StyledText>
      </StyledLegendItem>
      <StyledLegendItem>
        <StyledLine color="#14A5AB" />
        <StyledText>Projected balance</StyledText>
      </StyledLegendItem>
      <StyledLegendItem>
        <StyledLine color="#c8cbcd" />
        <StyledText>Actual balance</StyledText>
      </StyledLegendItem>
    </StyledLegendContainer>
  );
};

export default Legend;
