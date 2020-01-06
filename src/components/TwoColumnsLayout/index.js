import React from 'react';
import './style.scss';

const Container = ({ className = '', expand, ...rest }) => 
  <div className={`${expand 
    ? 'comp_TwoColumnsLayout___container-expanded' 
    : 'comp_TwoColumnsLayout___container-normal'} 
    ${className}`} 
  {...rest} />;

const LeftDiv = ({ ...rest }) => <div {...rest}/>;

const RightDiv = ({ className = '', ...rest }) => <div className={`comp_TwoColumnsLayout___right ${className}`} {...rest}/>;

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
