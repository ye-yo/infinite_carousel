import { useState, useRef } from 'react';
import useInterval from './useInterval';

const swipeOffset = 100;
const speed = 2000;

export default function useSwipe(slides, options) {
  const { transitionTime } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSwiping = useRef(false);
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [slideX, setSlideX] = useState(0);
  const trackClass = useRef();
  const startX = useRef(0);

  const swipeSlide = direction => {
    const next = currentIndex + (direction === 'next' ? 1 : -1);
    setCurrentIndex(next);
    if (next >= 0 && next < slides.length) return;
    setTimeout(() => {
      trackClass.current = 'no-effect';
      setCurrentIndex(next <= -1 ? slides.length - 1 : 0);
      setTimeout(() => {
        trackClass.current = '';
      }, 0);
    }, transitionTime * 1000);
  };

  const handleSlideButtonClick = e => {
    const direction = e.currentTarget.getAttribute('direction');
    swipeSlide(direction);
  };

  const getClientX = e => {
    if (e.type === 'touchstart') return e.touches[0].clientX;
    if (e.changedTouches) return e.changedTouches[0].clientX;
    return e.clientX;
  };

  const handleSwipeEnd = e => {
    if (startX.current) {
      const diff = startX.current - getClientX(e);
      if (diff > swipeOffset) {
        swipeSlide('next');
      } else if (diff < -swipeOffset) {
        swipeSlide('prev');
      }
      setSlideX(0);
    }
    startX.current = null;
  };

  const handleSwipeStart = e => {
    startX.current = getClientX(e);
  };

  const handleSwipe = e => {
    if (startX.current) {
      if (!isSwiping.current) isSwiping.current = true;
      setSlideX(getClientX(e) - startX.current);
    }
  };

  useInterval(() => swipeSlide('next'), isMouseOver ? null : speed);

  return {
    currentIndex,
    trackClass,
    slideX,
    handleSlideButtonClick,
    swipeEvents: {
      onMouseOver: () => setIsMouseOver(true),
      onMouseOut: () => setIsMouseOver(false),
      onMouseDown: handleSwipeStart,
      onTouchStart: handleSwipeStart,
      onTouchMove: handleSwipe,
      onMouseMove: handleSwipe,
      onTouchEnd: handleSwipeEnd,
      onMouseUp: handleSwipeEnd,
      onMouseLeave: handleSwipeEnd,
      onClick: e => {
        if (isSwiping.current) {
          e.preventDefault();
          isSwiping.current = false;
        }
      },
      onDragStart: e => e.preventDefault(),
    },
  };
}
