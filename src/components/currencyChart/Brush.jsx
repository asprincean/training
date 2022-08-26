import React from 'react';
import styled from 'styled-components';

const StyledBrush = styled.div`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.height}px`};
  border: 2px solid white;
  display: flex;
  margin: auto;
  /* background-color: transparent; */
  position: absolute;
  top: -1px;
  cursor: move;
`;

const Brush = ({ height, width, handleMouseDown, brushRef }) => {
  return (
    <StyledBrush
      ref={brushRef}
      height={height}
      width={width}
      onMouseDown={handleMouseDown}
    />
  );
};

export default Brush;
