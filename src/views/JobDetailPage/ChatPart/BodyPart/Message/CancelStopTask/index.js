import { mdiTimer } from '@mdi/js';
import Icon from '@mdi/react';
import { getDialogDate } from 'helpers/jobDetail/stringHelper';
import React from 'react';
import { useSelector } from 'react-redux';
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
  const dateFormat = useSelector(state => state.system.profile.format_date);

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
        <Icon className="CancelStopTask--icon" path={mdiTimer}></Icon>
        <div className="StopTask--content" >
          {getDialogDate(time_create, dateFormat)}
        </div>
        <div className="StopTask--notify" >
          {"Tiến độ công việc đã được chạy"}
        </div>
      </>
    </DialogMessageWrap>
  );
}

CancelStopTask.propTypes = {

};

export default CancelStopTask;
