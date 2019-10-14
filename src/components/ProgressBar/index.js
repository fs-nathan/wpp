import React from 'react';
import styled from 'styled-components';
import Icon from '@mdi/react';
import { mdiSquare } from '@mdi/js';
import ColorTypo from '../ColorTypo';

const ProgressBarBox = styled(({ percentDone, percentTarget, colorDone, colorTarget, ...rest }) => 
  <div {...rest}>
    <div>
      <div />
      <div />
    </div>
    <span>{percentDone}%</span>
    <span>{percentTarget}%</span>
    <span>Hôm nay</span>
    <span />
    <span />
  </div>
)`
  position: relative;
  height: 10px;
  margin: 35px 20px 65px 20px;
  & > div:first-child {
    position: relative;
    overflow: hidden;
    height: 10px;
    width: 100%;
    background-color: rgba(0, 0, 0, .2);
    border-radius: 10px;
    & > div:nth-child(1) {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10; 
      height: 10px;
      width: ${props => props.percentDone || 0}%;
      background-color: ${props => props.colorDone || 'rgb(49, 181, 134)'};
      border-radius: 10px 0 0 10px;
    }
    & > div:nth-child(2) { 
      position: absolute;
      top: 0;
      left: ${props => props.percentTarget || 0}%;
      transform: translateX(-50%);
      z-index: 20; 
      height: 10px;
      width: 10px;
      background-color: ${props => props.colorTarget || '#ff9800'};
      border-radius: 10px;
    }
  }
  & > span:nth-child(2) {
    color: red;
    position: absolute;
    top: -25px;
    left: ${props => props.percentDone || 0}%;
    transform: translateX(-50%);
    z-index: 10;
  }
  & > span:nth-child(3) {
    color: red;
    position: absolute;
    top: 25px;
    left: ${props => props.percentTarget || 0}%;
    transform: translateX(-50%);
    z-index: 10;
  }
  & > span:nth-child(4) {
    position: absolute;
    top: 40px;
    left: ${props => props.percentTarget || 0}%;
    transform: translateX(-50%);
    z-index: 10;
  }
  & > span:nth-child(5) {
    border: 1px solid red;
    position: absolute;
    top: -10px;
    height: 5px;
    left: ${props => props.percentDone || 0}%;
    transform: translateX(-50%);
    z-index: 10;
  }
  & > span:nth-child(6) {
    border: 1px solid red;
    position: absolute;
    top: 15px;
    height: 5px;
    left: ${props => props.percentTarget || 0}%;
    transform: translateX(-50%);
    z-index: 10;
  }
`;

const LegendBox = styled.div`
  margin: 10px 20px;
  display: flex;
  align-items: center;
  margin-top: 10px;
  & > *:first-child {
    margin-right: 10px;
  }
`;

function ProgressBar(props) {
  return (
    <div>
      <ProgressBarBox {...props} />
      <LegendBox>
        <Icon path={mdiSquare} size={1} color={props.colorDone || 'rgb(49, 181, 134)'} />
        <ColorTypo>Hoàn thành thực tế</ColorTypo>
      </LegendBox>
      <LegendBox>
        <Icon path={mdiSquare} size={1} color={props.colorTarget || '#ff9800'} />
        <ColorTypo>Kế hoạch</ColorTypo>
      </LegendBox>
    </div>
  )
}

export default ProgressBar;