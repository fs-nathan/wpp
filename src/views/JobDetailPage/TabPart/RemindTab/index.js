import { Slide } from '@material-ui/core';
import React from 'react';
import DetailRemind from './DetailRemind';
import RemindModal from './RemindModal';
import TabBody from './TabBody';
import TabHeader from './TabHeader';

function RemindTab(props) {
  return (
    <Slide in={props.show === 3} mountOnEnter unmountOnExit>
      <div className="container-tabpart">
        <TabHeader setShow={props.setShow} />
        <TabBody {...props} />
        <DetailRemind />
        <RemindModal />
      </div>
    </Slide>
  )
}

export default RemindTab;
