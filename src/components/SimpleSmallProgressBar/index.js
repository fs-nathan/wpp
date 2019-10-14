import React from 'react';
import styled from 'styled-components';

const Container = styled(({ color, ...rest }) => <div {...rest} />)`
  display: flex;
  align-items: center;
  & > span {
    color: ${props => props.color};
    font-size: 12px;
    margin-left: 5px;
  }
`;

const BackBar = styled.div`
  position: relative;
  width: 100%;
  height: 8px
  border-radius: 999px;
  background-color: rgba(0, 0, 0, 0.2);
`;

const FrontBar = styled(({ percentDone, color, ...rest }) => <div {...rest} />)`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: 999px;
  width: ${props => props.percentDone}%;
  background-color: ${props => props.color};
`;

const Target = styled(({ percentTarget, color, ...rest }) => <span {...rest} />)`
  position: absolute;
  top: 0;
  left: ${props => props.percentTarget}%;
  height: 8px;
  width: 8px;
  border-radius: 999px;
  background-color: ${props => props.color};
`;

function SimpleSmallProgressBar({ percentDone, percentTarget, color, targetColor }) {
  return (
    <Container color={color}>
      <BackBar>
        <FrontBar percentDone={percentDone} color={color}/>
        {percentTarget && <Target percentTarget={percentTarget} color={targetColor} />}
      </BackBar>
      <span>{percentDone}%</span>
    </Container>
  )
}

export default SimpleSmallProgressBar;
