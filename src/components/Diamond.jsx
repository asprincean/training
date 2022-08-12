import React from 'react';
import styled from 'styled-components';
import TooltipProvider from './TooltipProvider';
import TooltipContents from './TooltipContents';

function Diamond({ groupData, getTimePercentage, currentTime }) {
  const splitTime = groupData.time.split(':');
  const hour = Number(splitTime[0]);
  const minute = Number(splitTime[1]);

  let state = 'open';
  if (currentTime < groupData.time) {
    state = 'open';
  }
  if (currentTime >= groupData.time) {
    state = 'closed';
  }

  const getColors = () => {
    switch (state) {
      case 'closed':
        return {
          backgroundColor: '#1c4f83',
          textColor: 'white',
        };
      case 'open':
        return {
          backgroundColor: '#00847f',
          textColor: 'white',
        };

      default:
        return {
          backgroundColor: 'blue',
          textColor: 'white',
        };
    }
  };
  return (
    <TooltipProvider
      tooltipContents={<TooltipContents groupData={groupData} />}
      orientation="left"
      /* text="test"
      textStyle={{ color: 'black' }} */
      /* style={{ padding: '1rem' }} */
      /* borderColor="black" */
      /* backgroundColor="blue" */
    >
      <StyledDiamondShape
        timeOffset={getTimePercentage(hour, minute)}
        backgroundColor={getColors().backgroundColor}
      >
        <StyledItemCount>{groupData.data.length}</StyledItemCount>
      </StyledDiamondShape>
    </TooltipProvider>
  );
}

export default Diamond;

const StyledDiamondShape = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  z-index: 100;
  background-color: ${(props) => props.backgroundColor};
  height: 25px;
  top: 6px;
  transform-origin: left;
  transform: rotate(45deg) translateX(-50%);
  width: 25px;
  left: ${(props) => `${props.timeOffset}%`};
  z-index: 100;
  cursor: pointer;
`;
const StyledItemCount = styled.div`
  color: white;

  transform: rotate(-45deg);
  margin: auto;
  pointer-events: none;
`;
