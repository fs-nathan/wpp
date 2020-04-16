import { Slide } from '@material-ui/core';
import React from 'react';
import './styles.scss';
import TabBody from './TabBody';
import TabHeader from './TabHeader';

function SubtaskTab(props) {

  const [isClicked, setIsClicked] = React.useState(false);
  const handleClick = () => {
    setIsClicked(!isClicked)
  }
  return (
    <Slide in={props.show === 2} mountOnEnter unmountOnExit>
      <div className="subTab--container">
        <TabHeader className="subTab--header" setShow={props.setShow} onClickPlusIcon={handleClick} />
        <TabBody isClicked={isClicked} {...props} />
      </div>
    </Slide>
  )
}

export default SubtaskTab;
