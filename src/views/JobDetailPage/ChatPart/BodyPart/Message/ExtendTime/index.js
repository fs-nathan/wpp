import { mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const ExtendTime = ({
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
      }}
      isHideFooterIcon
      footerText=""
      taskName="ExtendTime"
    >
      <>
        <Icon className="ExtendTime--icon" path={mdiTimerOff}></Icon>
        <div className="UpdateTaskNameMessage--content" >
          Lúc {time_create}
        </div>
        <div className="ExtendTime--notify" >
          {"Tiến độ công việc đã được chạy"}
        </div>
      </>
    </DialogMessageWrap>
  );
}

ExtendTime.propTypes = {

};

export default ExtendTime;
