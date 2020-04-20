import { mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CancelStopTask = ({
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
      taskName="huỷ bỏ tạm dừng"
    >
      <>
        <Icon className="CancelStopTask--icon" path={mdiTimerOff}></Icon>
        <div className="UpdateTaskNameMessage--content" >
          Lúc {time_create}
        </div>
        <div className="CancelStopTask--notify" >
          {"Tiến độ công việc đã được chạy"}
        </div>
      </>
    </DialogMessageWrap>
  );
}

CancelStopTask.propTypes = {

};

export default CancelStopTask;
