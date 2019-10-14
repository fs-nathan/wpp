import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';

function MemberTab({ show, setShow }) {
  return (
    <Slide in={show === 8} direction='left' mountOnEnter unmountOnExit>
      <div>
        <TabHeader setShow={setShow} />
        <TabBody />
      </div>
    </Slide>
  )
}

export default MemberTab;
