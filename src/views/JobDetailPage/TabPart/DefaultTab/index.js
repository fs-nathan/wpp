import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';

function DefaultTab({ show, setShow }) {
  return (
    <Slide in={show === 0} direction='left' mountOnEnter unmountOnExit>
      <div>
        <TabHeader/>
        <TabBody setShow={setShow} />
      </div>
    </Slide>
  )
}

export default DefaultTab;
