import styled from 'styled-components';

const StyledLabel = styled.span`
  font-size: 18px;
  position: absolute;
  top: ${(props) => `${props.top}px`};
  left: ${(props) => `${props.left}px`};
  color: ${(props) => props.color};
  transform: ${(props) =>
    props.position === 'left' ? 'rotate(-90deg)' : 'rotate(0deg)'};
`;

const AxisLabel = ({ dimensions, margin, text, color, position }) => {
  const getTop = () => {
    if (position === 'left') {
      return margin.top + (dimensions.height - margin.top - margin.bottom) / 2;
    }
    return dimensions.height - margin.bottom / 2;
  };
  const getLeft = () => {
    if (position === 'left') {
      return 0;
    }
    return dimensions.width / 2;
  };

  return (
    <>
      {dimensions ? (
        <StyledLabel
          top={getTop()}
          left={getLeft()}
          color={color}
          position={position}
        >
          {text}
        </StyledLabel>
      ) : (
        <></>
      )}
    </>
  );
};

export default AxisLabel;
