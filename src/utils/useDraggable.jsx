import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import throttle from './throttle';

const useDraggable = ({ maxX, overlayLeftRef, overlayRightRef }) => {
  const delta = useRef({ x: 0, y: 0 });
  /* const position = useRef({ x: 0, y: 0 }); */
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const brushRef = useRef();

  const [pressed, setPressed] = useState(false);

  const handleMouseUp = (e) => {
    e.target.style.userSelect = 'auto';
    setPressed(false);
  };

  const handleMouseDown = (e) => {
    brushRef.current = e.target;
    e.target.style.userSelect = 'none';
    setPressed(true);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleDrag = useCallback(
    ({ x, y }) => ({
      x: Math.max(0, x),
      y: Math.max(0, y),
    }),
    []
  );

  useEffect(() => {
    if (overlayRightRef.current) {
      overlayRightRef.current.style.width = `${
        maxX - brushRef.current.getBoundingClientRect().width
      }px`;
    }
  }, [maxX]);

  useEffect(() => {
    if (!pressed) {
      return;
    }

    const handleMouseMove = /* throttle( */ (event) => {
      if (!brushRef.current) {
        return;
      }

      const getX = () => {
        if (delta.current.x + event.movementX < 0) {
          return 0;
        }
        if (
          delta.current.x +
            event.movementX +
            brushRef.current.getBoundingClientRect().width -
            2 <
          maxX
        ) {
          return delta.current.x + event.movementX * 1.35;
        }

        return delta.current.x;
      };

      delta.current = {
        x: getX(),
        y: /* delta.current.y + event.movementY */ 0,
      };
      const { x, y } = /* (position.current = */ handleDrag(
        delta.current
      ); /* ); */
      overlayLeftRef.current.style.width = `${x}px`;
      overlayRightRef.current.style.width = `${
        maxX - x - brushRef.current.getBoundingClientRect().width
      }px`;
      brushRef.current.style.transform = `translateX(${x}px)`;
      setPosition({ x, y });
    }; /* ) */

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      /* handleMouseMove.cancel(); */
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [pressed, handleDrag, position]);

  return {
    handleMouseDown,
    brushRef,
    position,
  };
};

export default useDraggable;
