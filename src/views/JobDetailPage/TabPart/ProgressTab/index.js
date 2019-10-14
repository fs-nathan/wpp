import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';

function ProgressTab({ show, setShow }) {
  return (
    <Slide in={show === 1} direction='left' mountOnEnter unmountOnExit>
      <div>
        <TabHeader setShow={setShow} />
        <TabBody />
      </div>
    </Slide>
  )
}

export default ProgressTab;
