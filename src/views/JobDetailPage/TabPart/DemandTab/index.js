import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';

function DemandTab({ show, setShow }) {
  return (
    <Slide in={show === 7} direction='left' mountOnEnter unmountOnExit>
      <div>
        <TabHeader setShow={setShow} />
        <TabBody />
      </div>
    </Slide>
  )
}

export default DemandTab;
