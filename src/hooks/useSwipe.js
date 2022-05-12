import { useState, useRef } from 'react';

const swipeOffset = 100;

export default function useSwipe(slides, options) {
  const { transitionTime } = options;
  const [currentIndex, setCurrentIndex] = useState(0);
  const isSwiping = useRef(false);
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

  return {
    currentIndex,
    trackClass,
    slideX,
    handleSlideButtonClick,
    swipeEvents: {
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
