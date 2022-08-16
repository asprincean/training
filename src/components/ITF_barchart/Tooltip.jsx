import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useChartTooltip from '../../utils/useChartTooltip';

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
  transition-duration: ${(props) => (props.showTooltip ? '0.06s' : '0s')};
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transition-delay: ${(props) => (props.showTooltip ? 0.02 : 0)}s;
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

const Tooltip = ({
  tooltipData,
  tooltipContents,
  orientation,
  backgroundColor = '#3e505d',
  borderColor = '#c4c7c7',
  text,
  textStyle,
  wrapperRef,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();
  const orientationRef = useRef(orientation);

  let bounding = { top: 0, left: 0 };
  if (wrapperRef.current) {
    bounding = wrapperRef.current.getBoundingClientRect();
  }

  /*  console.log(bounding); */

  const getOrientation = () => {
    const elementRect = tooltipData.elementRect;
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

  const getPosition = () => {
    const elementRect = tooltipData.elementRect;
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    switch (orientationRef.current) {
      case 'left':
        positionRef.current.x = elementRect.left - tooltipRect.width - 13 - 7;
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

  useEffect(() => {
    if (tooltipData.elementRect) {
      if (tooltipData.visible) {
        getPosition();
        getOrientation();
        setShowTooltip(tooltipData.visible);
      } else {
        setShowTooltip(tooltipData.visible);
      }
    }
  }, [tooltipData]);

  return (
    <StyledTooltipContainer
      ref={tooltipRef}
      showTooltip={showTooltip}
      x={positionRef.current.x - bounding.left}
      y={positionRef.current.y - bounding.top}
      /*  showTooltip={tooltipData.visible} */
      /* x={tooltipData.elementRect?.left - bounding.left}
      y={tooltipData.elementRect?.top - bounding.top} */
      arrowProps={getArrowProps()}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
      /* {...rest} */
    >
      {tooltipContents ? (
        tooltipContents
      ) : (
        <StyledText style={textStyle}>{text}</StyledText>
      )}
    </StyledTooltipContainer>
  );
};

export default Tooltip;
