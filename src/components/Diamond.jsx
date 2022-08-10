import React from 'react';
import styled from 'styled-components';

function Diamond({ findOcc, getTimePercentage }) {
  return (
    <div>
      {findOcc.map((item) => (
        <StyledDiamondShape>
          <StyledItemCount>{item.occurrence}</StyledItemCount>
        </StyledDiamondShape>
      ))}
    </div>
  );
}

export default Diamond;

const StyledDiamondShape = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 16.7%;
  z-index: 100;
  background: #00847f;
  height: 25px;
  top: 6px;
  transform: rotate(45deg);
  width: 25px;
`;
const StyledItemCount = styled.div`
  color: white;
  height: 25px;
  position: absolute;
  top: 10%;
  left: 5%;
  transform: rotate(-45deg);
  width: 25px;
`;
