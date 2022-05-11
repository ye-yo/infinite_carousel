import styled, { css } from 'styled-components';
import { IoIosArrowDropleftCircle } from 'react-icons/io';
import SlideItem from './SlideItem';

function Slider({ slides }) {
  return (
    <SliderArea>
      <SlideTrack>
        {slides.map(item => (
          <SlideItem key={item.id} item={item} />
        ))}
      </SlideTrack>
      <Button direction="prev" />
      <Button direction="next" />
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
