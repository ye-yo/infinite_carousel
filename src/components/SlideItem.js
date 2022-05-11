import styled from 'styled-components';

function SlideItem({ item }) {
  return (
    <Item>
      <Link>
        <Image background={item.background}>{item.id}</Image>
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
`;

const Link = styled.a`
  display: block;
  cursor: pointer;
  width: 100%;
  height: 100%;
`;

const Image = styled.div`
  background: ${props => props.background};
  width: 100%;
  height: 100%;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 60px;
  color: white;
`;
