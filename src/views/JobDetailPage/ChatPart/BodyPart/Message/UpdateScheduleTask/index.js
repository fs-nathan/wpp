import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateScheduleTask = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  schedule_name,
  time_create,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();

  function onClickViewDetail() {
    dispatch(showTab(0))
  }

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
      onClickViewDetail={onClickViewDetail}
      taskName="Thay đổi lịch làm việc"
    >
      <>
        {schedule_name}
      </>
    </DialogMessageWrap>
  );
}

UpdateScheduleTask.propTypes = {

};

export default UpdateScheduleTask;
