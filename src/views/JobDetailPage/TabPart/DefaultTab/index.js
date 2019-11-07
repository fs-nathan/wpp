import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import styled from 'styled-components'
const Container = styled.div`
  overflow: auto
`

function DefaultTab({ show, setShow }) {
  return (
    <Slide in={show === 0} direction='left' mountOnEnter unmountOnExit>
      <Container>
        <TabHeader/>
        <TabBody setShow={setShow} />
      </Container>
    </Slide>
  )
}

export default DefaultTab;
