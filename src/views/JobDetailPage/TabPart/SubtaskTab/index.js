import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';

function SubtaskTab({ show, setShow }) {
  const [isClicked, setIsClicked] = React.useState(false);
  const handleClick = () =>{setIsClicked(!isClicked)}
  return (
    <Slide in={show === 2} direction='left' mountOnEnter unmountOnExit>
      <div>
        <TabHeader setShow={setShow}  onClickPlusIcon = {()=>handleClick()}/>
        <TabBody isClicked={isClicked}/>
      </div>
    </Slide>
  )
}

export default SubtaskTab;
