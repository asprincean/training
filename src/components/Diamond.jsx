import React from 'react';
import styled from 'styled-components';
import TooltipProvider from './TooltipProvider';
import TooltipContents from './TooltipContents';

function Diamond({
  groupData,
  getTimePercentage,
  currentTime,
  selectedCurrencyIds,
  setSelectedCurrencyIds,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    setSelectedCurrencyIds([groupData.data[0].id]);
  };
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
  if (selectedCurrencyIds[0] === groupData.data[0].id) {
    state = 'selected';
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
      case 'selected':
        return {
          backgroundColor: '#ffff',
          textColor: '#333333',
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
        onClick={handleClick}
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
  color: ${(props) => props.color};
  transform: rotate(-45deg);
  margin: auto;
  pointer-events: none;
`;
