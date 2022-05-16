import styled from 'styled-components';

function SlideItem({ item, isCurrent, opacity, imageFit }) {
  const image = <img src={item.src} alt={`slide-${item.id}`} />;
  return (
    <Item
      isCurrent={isCurrent}
      opacity={opacity}
      imageFit={imageFit}
      className={
        (isCurrent ? 'current' : '') +
        (item.originId !== undefined ? 'clone-slide' : '')
      }
    >
      {item.url ? <a href={item.url}>{image}</a> : image}
    </Item>
  );
}

export default SlideItem;

const Item = styled.li`
  width: 100%;
  height: 100%;
  list-style: none;
  flex: 0 0 100%;
  opacity: ${({ opacity }) => opacity};
  &.current {
    opacity: 1;
  }
  > a {
    display: block;
    cursor: pointer;
    width: 100%;
    height: 100%;
    text-decoration: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: ${({ imageFit }) => imageFit};
  }
`;
