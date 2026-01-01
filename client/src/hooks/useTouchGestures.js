import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for touch gesture detection
 * @param {Object} options - Configuration options
 * @param {Function} options.onSwipeLeft - Callback for left swipe
 * @param {Function} options.onSwipeRight - Callback for right swipe
 * @param {Function} options.onSwipeUp - Callback for up swipe
 * @param {Function} options.onSwipeDown - Callback for down swipe
 * @param {number} options.threshold - Minimum distance for swipe detection
 */
export const useTouchGestures = ({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  threshold = 50
}) => {
  const touchStart = useRef({ x: 0, y: 0 });
  const [isTouching, setIsTouching] = useState(false);

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    setIsTouching(true);
  };

  const handleTouchEnd = (e) => {
    if (!isTouching) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStart.current.x;
    const deltaY = touch.clientY - touchStart.current.y;
    const absDeltaX = Math.abs(deltaX);
    const absDeltaY = Math.abs(deltaY);

    // Determine if it's a horizontal or vertical swipe
    if (absDeltaX > absDeltaY && absDeltaX > threshold) {
      if (deltaX > 0 && onSwipeRight) {
        onSwipeRight();
      } else if (deltaX < 0 && onSwipeLeft) {
        onSwipeLeft();
      }
    } else if (absDeltaY > threshold) {
      if (deltaY > 0 && onSwipeDown) {
        onSwipeDown();
      } else if (deltaY < 0 && onSwipeUp) {
        onSwipeUp();
      }
    }

    setIsTouching(false);
  };

  const handlers = {
    onTouchStart: handleTouchStart,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: () => setIsTouching(false)
  };

  return { handlers, isTouching };
};

/**
 * Hook for pull-to-refresh functionality
 * @param {Function} onRefresh - Callback function to execute on refresh
 * @param {number} threshold - Distance threshold to trigger refresh
 */
export const usePullToRefresh = (onRefresh, threshold = 100) => {
  const [isPulling, setIsPulling] = useState(false);
  const [pullDistance, setPullDistance] = useState(0);
  const startY = useRef(0);
  const containerRef = useRef(null);

  const handleTouchStart = (e) => {
    if (containerRef.current.scrollTop === 0) {
      startY.current = e.touches[0].clientY;
    }
  };

  const handleTouchMove = (e) => {
    if (containerRef.current.scrollTop > 0) return;

    const currentY = e.touches[0].clientY;
    const distance = currentY - startY.current;

    if (distance > 0) {
      e.preventDefault();
      setPullDistance(Math.min(distance, threshold * 1.5));
      setIsPulling(distance > threshold);
    }
  };

  const handleTouchEnd = async () => {
    if (isPulling && onRefresh) {
      await onRefresh();
    }
    setIsPulling(false);
    setPullDistance(0);
  };

  return {
    containerRef,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    },
    isPulling,
    pullDistance
  };
};
