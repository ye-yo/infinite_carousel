import styled from 'styled-components';

function SlideItem({ item, isCurrent }) {
  return (
    <Item
      isCurrent={isCurrent}
      className={
        (isCurrent ? 'current' : '') +
        (item.originId !== undefined ? 'clone-slide' : '')
      }
    >
      <Link href="/">
        <Image background={item.background}>
          {item.originId !== undefined ? item.originId : item.id}
        </Image>
      </Link>
    </Item>
  );
}

export default SlideItem;

const Item = styled.li`
  width: 100%;
  height: 100%;
  list-style: none;
  flex: 0 0 100%;
  opacity: ${({ isCurrent }) => (isCurrent ? 1 : 0.6)};
`;

const Link = styled.a`
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;
  text-decoration: none;
`;

const Image = styled.div`
  background: ${props => props.background};
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
`;
