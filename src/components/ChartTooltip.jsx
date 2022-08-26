import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from 'react';
import styled from 'styled-components';

const StyledTooltipContainer = styled.span.attrs((props) => ({
  style: {
    top: `${props.y}px`,
    left: `${props.x}px`,
    opacity: props.showTooltip ? 1 : 0,
    backgroundColor: props.backgroundColor,
    border: `1px solid ${props.borderColor}`,
    transitionDuration: props.showTooltip ? '0.06s' : '0s',
    transitionDelay: `(${props.showTooltip ? 0.02 : 0})s`,
    transform: `scale(${props.showTooltip ? 1.2 : 1})`,
  },
}))
`
  position: absolute;
  pointer-events: none;
  padding: 0.7rem 0.8rem 0.4rem 0.8rem;
  border-radius: 1px;
  z-index: 1000;
  display: flex;
  transition-property: transform, opacity;
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  transform-origin: center;
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

const ChartTooltip = ({
  tooltipData,
  tooltipContents,
  orientation,
  backgroundColor = '#3e505d',
  borderColor = '#c4c7c7',
  text,
  textStyle,
  wrapperRef,
  gap = 0,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const positionRef = useRef({ x: 0, y: 0 });
  const tooltipRef = useRef();
  const [adaptedOrientation, setAdaptedOrientation] = useState(orientation);

  let bounding = useMemo(() => ({ top: 0, left: 0 }), []);
  if (wrapperRef.current) {
    bounding = wrapperRef.current.getBoundingClientRect();
  }
  const checkOrientation = useCallback(async () => {
    const elementRect = tooltipData.elementRect;
    const tooltipRect = tooltipRef.current.getBoundingClientRect();

    let checks = {
      left: { valid: true, preferedAlt: 'right' },
      right: { valid: true, preferedAlt: 'left' },
      top: { valid: true, preferedAlt: 'bottom' },
      bottom: { valid: true, preferedAlt: 'top' },
    };

    if (elementRect.left < tooltipRect.width + 20) {
      checks.left.valid = false;
    }

    if (bounding.width < elementRect.right + tooltipRect.width + 20) {
      checks.right.valid = false;
    }

    if (elementRect.top < tooltipRect.height + 20) {
      checks.top.valid = false;
    }

    if (bounding.bottom < elementRect.bottom + tooltipRect.height + 20) {
      checks.bottom.valid = false;
    }

    // left and right invalidations override other possible orientations

    if (!checks.left.valid && checks.right.valid) {
      checks.top.valid = false;
      checks.bottom.valid = false;
    }

    if (!checks.right.valid && checks.left.valid) {
      checks.top.valid = false;
      checks.bottom.valid = false;
    }
    return checks;
  }, [bounding, tooltipData]);

  const getOrientation = useCallback(async () => {
    const checks = await checkOrientation();
    const preferedAlt = checks[orientation].preferedAlt;

    let valid = [];

    for (const item in checks) {
      if (checks[item].valid) {
        valid.push(item);
      }
    }

    if (checks[orientation].valid) {
      return orientation;
    } else if (valid.includes(preferedAlt)) {
      return preferedAlt;
    } else if (valid.length > 0) {
      return valid[0];
    }
    return orientation;
  }, [checkOrientation, orientation]);

  const getArrowProps = () => {
    switch (adaptedOrientation) {
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

  const getPosition = useCallback(async () => {
    const elementRect = tooltipData.elementRect;
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const adaptedOrientation = await getOrientation();
    setAdaptedOrientation(adaptedOrientation);
    switch (adaptedOrientation) {
      case 'left':
        positionRef.current.x =
          elementRect.left - tooltipRect.width - 13 - 7 - gap;
        positionRef.current.y =
          elementRect.top + elementRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'right':
        positionRef.current.x =
          elementRect.left + elementRect.width + 13 + 7 + gap;
        positionRef.current.y =
          elementRect.top + elementRect.height / 2 - tooltipRect.height / 2;
        break;
      case 'top':
        positionRef.current.x =
          elementRect.left - (tooltipRect.width / 2 - elementRect.width / 2);
        positionRef.current.y =
          elementRect.top - tooltipRect.height - 13 - 1 - gap;
        break;
      case 'bottom':
        positionRef.current.x =
          elementRect.left - (tooltipRect.width / 2 - elementRect.width / 2);
        positionRef.current.y =
          elementRect.top + elementRect.height + 13 + 3 + gap;
        break;
      default:
        positionRef.current.x = elementRect.left - tooltipRect.width - 13 - 6;
        positionRef.current.y =
          elementRect.top + elementRect.height / 2 - tooltipRect.height / 2;
        break;
    }
  }, [getOrientation, tooltipData, gap]);

  const handleShowTooltip = useCallback(async () => {
    await getPosition();
    setShowTooltip(tooltipData.visible);
  }, [getPosition, tooltipData]);

  useEffect(() => {
    if (tooltipData.elementRect) {
      handleShowTooltip();
    }
  }, [tooltipData, handleShowTooltip]);

  return (
    <StyledTooltipContainer
      ref={tooltipRef}
      showTooltip={showTooltip}
      x={positionRef.current.x - bounding.left}
      y={positionRef.current.y - bounding.top}
      arrowProps={getArrowProps()}
      backgroundColor={backgroundColor}
      borderColor={borderColor}
    >
      {tooltipContents ? (
        tooltipContents
      ) : (
        <StyledText style={textStyle}>{text}</StyledText>
      )}
    </StyledTooltipContainer>
  );
};

export default ChartTooltip;
