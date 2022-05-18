import { useState, useRef } from 'react';
import useInterval from './useInterval';

const swipeOffset = 100;

export default function useSwipe(slides, options) {
  const {
    transitionSpeed,
    startIndex,
    slideToScroll,
    slideToAdd,
    autoSlideSpeed,
    infinite,
  } = options;
  const [currentIndex, setCurrentIndex] = useState(startIndex + slideToAdd);
  const isSwiping = useRef(false);
  const [isMouseOver, setIsMouseOver] = useState(!options.autoSlide);
  const [slideX, setSlideX] = useState(0);
  const trackClass = useRef();
  const startX = useRef(0);

  const swipeSlide = direction => {
    const next =
      currentIndex + (direction === 'next' ? slideToScroll : -slideToScroll);
    const first = slideToAdd;
    const last = slides.length + slideToAdd;
    const checkIndex = next >= first && next < last;

    if (checkIndex) {
      setCurrentIndex(next);
      return;
    }
    if (!infinite) return;
    setCurrentIndex(next);

    setTimeout(() => {
      trackClass.current = 'no-effect';
      setCurrentIndex(next <= first ? last - 1 : first);
      setTimeout(() => {
        trackClass.current = '';
      }, 0);
    }, transitionSpeed);
  };

  useInterval(() => swipeSlide('next'), isMouseOver ? null : autoSlideSpeed);

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
      onMouseOver: () => options.autoSlide && setIsMouseOver(true),
      onMouseOut: () => options.autoSlide && setIsMouseOver(false),
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
