import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';

function RemindTab({ show, setShow }) {
  return (
    <Slide in={show === 3} direction='left' mountOnEnter unmountOnExit>
      <div style={{ height: '100%'}}>
        <TabHeader setShow={setShow} />
        <TabBody />
      </div>
    </Slide>
  )
}

export default RemindTab;
