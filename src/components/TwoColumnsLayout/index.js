import React from 'react';
import styled from 'styled-components';

const Container = styled(({ expand, ...rest }) => <div {...rest} />)`
  height: 100%;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: ${props => props.expand ? 'auto' : 'minmax(300px, 1fr) minmax(800px, 3fr)'};
`;

const LeftDiv = styled.div`
`;

const RightDiv = styled.div`
  border-left: 1px solid rgba(0, 0, 0, .1);
`;

function TwoColumnsLayout({
  leftRenders = [() => <div />],
  rightRender = () => <div />,
}) {
  
  const [expand, setExpand] = React.useState(false);
  const [subSlide, setSubSlide] = React.useState(0);

  function handleExpand(expand) {
    setExpand(expand);
  }

  function handleSubSlide(subSlide) {
    setSubSlide(subSlide);
  }

  console.log('XXX');

  return (
    <Container expand={expand}>
      {!expand && (
        <LeftDiv>
          {leftRenders[subSlide]({ handleSubSlide })}
        </LeftDiv>
      )}
      <RightDiv>
        {rightRender({ expand, handleExpand, handleSubSlide })}
      </RightDiv>
    </Container>
  );
}

export default TwoColumnsLayout;
