import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';

function SubtaskTab(props) {
  
  const [isClicked, setIsClicked] = React.useState(false);
  const handleClick = () =>{setIsClicked(!isClicked)}
  return (
    <Slide in={props.show === 2} direction='left' mountOnEnter unmountOnExit>
      <div>
        <TabHeader setShow={props.setShow}  onClickPlusIcon = {()=>handleClick()}/>
        <TabBody isClicked={isClicked} {...props}/>
      </div>
    </Slide>
  )
}

export default SubtaskTab;
