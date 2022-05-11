import { useState, useMemo, useRef } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import SlideItem from './SlideItem';
import setInfiniteSlide from '../utils';

const transitionTime = 0.5;
const slideToAdd = 1;

function Slider({ slides }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const items = useMemo(() => setInfiniteSlide(slides, slideToAdd), [slides]);
  const trackClass = useRef();

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

  const handleSwipeSlide = e => {
    const direction = e.currentTarget.getAttribute('direction');
    swipeSlide(direction);
  };

  return (
    <SliderArea>
      <SlideTrack className={trackClass.current} currentIndex={currentIndex}>
        {items.map((item, index) => (
          <SlideItem key={item.id} item={item} index={index} isCenter={currentIndex === item.id} />
        ))}
      </SlideTrack>
      <Button direction="prev" onClick={handleSwipeSlide} />
      <Button direction="next" onClick={handleSwipeSlide} />
    </SliderArea>
  );
}

export default Slider;

const SliderArea = styled.div`
  position: relative;
  overflow: hidden;
`;

const SlideTrack = styled.ul`
  display: flex;
  width: 100%;
  height: 400px;
  padding: 0;
  margin: 0;
  transform: translateX(${({ currentIndex }) => -100 * (slideToAdd + currentIndex)}%);
  &:not(.no-effect) {
    transition: transform ${transitionTime}s;
  }
`;

const Button = styled(IoIosArrowDropleftCircle)`
  position: absolute;
  width: 32px;
  height: 32px;
  top: 50%;
  color: #eeeeee88;
  cursor: pointer;
  ${({ direction }) => css`
    transform: translate(0%, -50%) rotate(${direction === 'next' ? 180 : 0}deg);
    ${direction === 'next' ? 'right' : 'left'} : 10px;
  `};
`;
