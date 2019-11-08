import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import styled from 'styled-components'
const Container = styled.div`
  overflow: auto
`
const TabBodyDefault = styled(TabBody)`
  height: calc(100% - 230px);
  overflow-x: hidden;
`

function DefaultTab({ show, setShow }) {
  const [isPause, setIsPause] = React.useState(false);
  const handleClick = () => { setIsPause(!isPause) }
  return (
    <Slide in={show === 0} direction='left' mountOnEnter unmountOnExit>
      <Container>
        <TabHeader onClickPause={() => {
          handleClick()
        }} />
        <TabBodyDefault setShow={setShow} isPause={isPause} />
      </Container>
    </Slide>
  )
}

export default DefaultTab;
