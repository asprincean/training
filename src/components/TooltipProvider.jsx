import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Portal from '../utils/Portal';

const StyledTooltipContainer = styled.span`
  position: absolute;
  top: ${(props) => `${props.y}px`};
  left: ${(props) => `${props.x}px`};
  opacity: ${(props) => (props.showTooltip ? 1 : 0)};
  pointer-events: none;
  padding: 0.7rem 0.8rem 0.4rem 0.8rem;
  background-color: ${(props) => props.backgroundColor};
  border: ${(props) => `1px solid ${props.borderColor}`};
  border-radius: 1px;
  z-index: 1000;
  display: flex;
  transition-property: transform, opacity;
  transition-duration: 0.06s;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-delay: ${(props) => (props.showTooltip ? 0.02 : 0.02)}s;
  transform-origin: center;
  transform: ${(props) => `scale(${props.showTooltip ? 1.2 : 1})`};
  :before {
    content: ' ';
    position: absolute;
    top: ${(props) => props.arrowProps.top};
    bottom: ${(props) => props.arrowProps.bottom};
    left: ${(props) => props.arrowProps.left};
    right: ${(props) => props.arrowProps.right};
    margin-left: 0px;
    border-width: 6px;
    border-style: solid;
    border-color: ${(props) => props.arrowProps.borderColorBefore};
    transform: ${(props) => props.arrowProps.transformBefore};
  }
  :after {
    content: ' ';
    position: absolute;
    top: ${(props) => props.arrowProps.top};
    bottom: ${(props) => props.arrowProps.bottom};
    left: ${(props) => props.arrowProps.left};
    right: ${(props) => props.arrowProps.right};
    margin-left: 0px;
    border-width: 6px;
    border-style: solid;
    border-color: ${(props) => props.arrowProps.borderColorAfter};
    transform: ${(props) => props.arrowProps.transformAfter};
  }
`;

const StyledText = styled.span`
  display: flex;
  margin: auto;
  color: white;
`;

const TooltipProvider = ({
  children,
  disabled,
  orientation,
  tooltipContents,
  text,
  textStyle,
  backgroundColor = '#3e505d',
  borderColor = '#c4c7c7',
  ...rest
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();
  const orientationRef = useRef();

  const getOrientation = (e) => {
    const elementRect = e.target.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    switch (orientation) {
      case 'left':
        if (elementRect.left < tooltipRect.width + 20) {
          orientationRef.current = 'right';
        }
        break;
      case 'right':
        if (elementRect.right < tooltipRect.width + 20) {
          orientationRef.current = 'left';
        }
        break;
      case 'top':
        if (elementRect.top < tooltipRect.height + 20) {
          orientationRef.current = 'bottom';
        }
        break;
      case 'bottom':
        if (elementRect.bottom < tooltipRect.height + 20) {
          orientationRef.current = 'top';
        }
        break;
      default:
        break;
    }
  };

  const getArrowProps = () => {
    switch (orientationRef.current) {
      case 'left':
        return {
          top: '50%',
          left: '100%',
          borderColorBefore: `transparent transparent transparent ${borderColor}`,
          borderColorAfter: `transparent transparent transparent ${backgroundColor}`,
          transformBefore: 'translate(0, -50%)',
          transformAfter: 'translate(-1px, -50%)',
        };
      case 'right':
        return {
          top: '50%',
          right: '100%',
          borderColorBefore: `transparent ${borderColor} transparent transparent`,
          borderColorAfter: `transparent ${backgroundColor}  transparent transparent`,
          transformBefore: 'translate(0, -50%)',
          transformAfter: 'translate(1px, -50%)',
        };
      case 'top':
        return {
          top: '100%',
          left: '50%',
          borderColorBefore: `${borderColor} transparent transparent transparent`,
          borderColorAfter: `${backgroundColor} transparent transparent transparent`,
          transformBefore: 'translate(-50%, 0px)',
          transformAfter: 'translate(-50%, -1px)',
        };
      case 'bottom':
        return {
          bottom: '100%',
          left: '50%',
          borderColorBefore: `transparent transparent ${borderColor} transparent`,
          borderColorAfter: `transparent transparent ${backgroundColor} transparent`,
          transformBefore: 'translate(-50%, 0px)',
          transformAfter: 'translate(-50%, 1px)',
        };

      default:
        return {
          top: '50%',
          left: '100%',
          borderColorBefore: `transparent transparent transparent ${borderColor}`,
          borderColorAfter: `transparent transparent transparent ${backgroundColor}`,
          transformBefore: 'translate(0, -50%)',
          transformAfter: 'translate(-1px, -50%)',
        };
    }
  };

  const getPosition = (e) => {
    const elementRect = e.target.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    switch (orientationRef.current) {
      case 'left':
        positionRef.current.x = elementRect.left - tooltipRect.width - 13 - 7; // accounting for scaling and arrow
        positionRef.current.y =
          elementRect.top + elementRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        positionRef.current.x = elementRect.left + elementRect.width + 13 + 7;
        positionRef.current.y =
          elementRect.top + elementRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'top':
        positionRef.current.x =
          elementRect.left - (tooltipRect.width / 2 - elementRect.width / 2);
        positionRef.current.y = elementRect.top - tooltipRect.height - 13 - 1;
        break;
      case 'bottom':
        positionRef.current.x =
          elementRect.left - (tooltipRect.width / 2 - elementRect.width / 2);
        positionRef.current.y = elementRect.top + elementRect.height + 13 + 3;
        break;
      default:
        positionRef.current.x = elementRect.left - tooltipRect.width - 13 - 6;
        positionRef.current.y =
          elementRect.top + elementRect.height / 2 - tooltipRect.height / 2;
        break;
    }
  };

  const handleMouseOver = (e) => {
    if (!disabled) {
      getOrientation(e);
      getPosition(e);
      setShowTooltip(true);
    }
  };

  const handleMouseOut = () => {
    if (!disabled) {
      setShowTooltip(false);
    }
  };

  return (
    <>
      {React.cloneElement(children, {
        onMouseOver: handleMouseOver,
        onMouseOut: handleMouseOut,
      })}
      {!disabled ? (
        <Portal>
          <StyledTooltipContainer
            ref={tooltipRef}
            showTooltip={showTooltip}
            x={positionRef.current.x}
            y={positionRef.current.y}
            arrowProps={getArrowProps()}
            backgroundColor={backgroundColor}
            borderColor={borderColor}
            {...rest}
          >
            {tooltipContents ? (
              tooltipContents
            ) : (
              <StyledText style={textStyle}>{text}</StyledText>
            )}
          </StyledTooltipContainer>
        </Portal>
      ) : (
        <></>
      )}
    </>
  );
};

export default TooltipProvider;
