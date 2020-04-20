import { mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const StopTask = ({
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
      taskName="Tạm dừng công việc"
    >
      <>
        <Icon className="StopTask--icon" path={mdiTimerOff}></Icon>
        <div className="UpdateTaskNameMessage--content" >
          Lúc {time_create}
        </div>
        <div className="StopTask--notify" >
          {"Tiến độ công việc sẽ được tính khi huỷ bỏ tạm dừng!"}
        </div>
      </>
    </DialogMessageWrap>
  );
}

StopTask.propTypes = {

};

export default StopTask;
