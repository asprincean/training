import React from 'react';
import styled from 'styled-components';

const StyledLabel = styled.span`
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  transform: rotate(-45deg);
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  color: #c1c3c2;
  width: ${(props) => `${props.bandWidth}px`};
`;

const XAxisTickLabel = ({ margin, dimensions, xScale, bandWidth, value }) => {
  const top = dimensions?.height - margin?.bottom / 2 - 10;
  const left = xScale(value) + margin.left; /* + bandWidth / 2 */

  return (
    <StyledLabel top={top} left={left} bandWidth={bandWidth}>
      {value}
    </StyledLabel>
  );
};

export default XAxisTickLabel;
