import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import styled from 'styled-components'
const Container = styled.div`
  overflow: auto
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
        <TabBody setShow={setShow} isPause={isPause} />
      </Container>
    </Slide>
  )
}

export default DefaultTab;
