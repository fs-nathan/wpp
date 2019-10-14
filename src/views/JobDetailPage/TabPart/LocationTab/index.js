import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';

function LocationTab({ show, setShow }) {
  return (
    <Slide in={show === 5} direction='left' mountOnEnter unmountOnExit>
      <div>
        <TabHeader setShow={setShow} />
        <TabBody />
      </div>
    </Slide>
  )
}

export default LocationTab;
