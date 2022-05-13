import { useMemo } from 'react';
import styled, { css } from 'styled-components';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import SlideItem from './SlideItem';
import setInfiniteSlide from '../utils';
import useSwipe from '../hooks/useSwipe';
import defaultOptions from '../constants';
import useSlideOptions from '../hooks/useSlideOptions';

const transitionTime = 0.5;

function Slider({ slides, customOptions }) {
  const options = useSlideOptions(defaultOptions, customOptions);
  const items = useMemo(
    () => setInfiniteSlide(slides, options.slideToAdd),
    [slides, options],
  );
  const {
    currentIndex,
    trackClass,
    slideX,
    swipeEvents,
    handleSlideButtonClick,
  } = useSwipe(slides, { transitionTime });

  const scrollRatio = useMemo(() => {
    const one = 100 / options.slideToShow;
    if (options.centerMode && options.slideToShow % 2 === 1) {
      return -one * (currentIndex + 1);
    }
    return -one * (currentIndex + options.slideToAdd);
  }, [currentIndex, options]);

  return (
    <SliderArea>
      <SlideTrack
        className={trackClass.current}
        slideX={slideX}
        {...swipeEvents}
        options={options}
        scrollRatio={scrollRatio}
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
  transform: ${({ scrollRatio, slideX }) =>
    `translateX(calc(${scrollRatio}% + ${slideX}px))`};
  &:not(.no-effect) {
    transition: transform ${transitionTime}s;
  }

  > li {
    flex: 0 0 ${({ options }) => options.slideWidthRatio}%;
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
