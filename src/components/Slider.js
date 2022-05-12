import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import SlideItem from './SlideItem';
import setInfiniteSlide from '../utils';
import useSwipe from '../hooks/useSwipe';

const transitionTime = 0.5;
const slideToAdd = 1;

function Slider({ slides }) {
  const items = useMemo(() => setInfiniteSlide(slides, slideToAdd), [slides]);
  const {
    currentIndex,
    trackClass,
    slideX,
    swipeEvents,
    handleSlideButtonClick,
  } = useSwipe(slides, { transitionTime });

  return (
    <SliderArea>
      <SlideTrack
        className={trackClass.current}
        currentIndex={currentIndex}
        slideX={slideX}
        {...swipeEvents}
      >
        {items.map((item, index) => (
          <SlideItem
            key={item.id}
            item={item}
            index={index}
            isCenter={currentIndex === item.id}
          />
        ))}
      </SlideTrack>
      <Button direction="prev" onClick={handleSlideButtonClick} />
      <Button direction="next" onClick={handleSlideButtonClick} />
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
  transform: ${({ currentIndex, slideX }) =>
    `translateX(calc(${-100 * (slideToAdd + currentIndex)}% + ${slideX}px))`};
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
