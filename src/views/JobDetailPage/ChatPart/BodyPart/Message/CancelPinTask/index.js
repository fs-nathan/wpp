import { mdiPinOff } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CancelPinTask = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  new_task_name,
  time_create,
  chatPosition = "top",
}) => {

  return (
    <DialogMessageWrap
      {...{
        chatPosition,
        user_create_name,
        user_create_avatar,
        user_create_position,
        time_create,
      }}
      isHideFooterIcon
      footerText=""
      taskName="bỏ ghim công việc"
    >
      <>
        <Icon className="CancelPinTask--icon" path={mdiPinOff}></Icon>
      </>
    </DialogMessageWrap>
  );
}

CancelPinTask.propTypes = {

};

export default CancelPinTask;
