import React from "react";
import "./style.scss";
import { useParams } from "react-router-dom";

const Container = ({ className = "", expand, ...rest }) => (
  <div
    className={`${
      expand
        ? "comp_TwoColumnsLayout___container-expanded"
        : "comp_TwoColumnsLayout___container-normal"
    } 
    ${className}`}
    {...rest}
  />
);

const LeftDiv = ({ ...rest }) => <div {...rest} />;

const RightDiv = ({ className = "", ...rest }) => (
  <div className={`comp_TwoColumnsLayout___right ${className}`} {...rest} />
);

function TwoColumnsLayout({
  leftRenders = [() => <div />],
  rightRender = () => <div />,
  closeLeft,
}) {
  const { memberId } = useParams();
  const [expand, setExpand] = React.useState(closeLeft);
  const [subSlide, setSubSlide] = React.useState(memberId ? 1 : 0);
  function handleExpand(expand) {
    setExpand(expand);
  }

  React.useEffect(() => {
    setExpand(closeLeft);
  }, [closeLeft]);

  function handleSubSlide(subSlide) {
    setSubSlide(subSlide);
  }

  const cardStyle = {
    display: expand ? "none" : "initial",
    opacity: expand ? "0" : "100",
    transition: "transform 0ms cubic-bezier(0, 0, 0.2, 1) 0ms",
  };

  return (
    <Container expand={expand}>
      <LeftDiv className="left-div" style={cardStyle}>
        {leftRenders[subSlide]({ handleSubSlide })}
      </LeftDiv>
      <RightDiv>
        {rightRender({ expand, handleExpand, handleSubSlide })}
      </RightDiv>
    </Container>
  );
}

export default TwoColumnsLayout;
