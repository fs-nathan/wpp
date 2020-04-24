import { getSubtaskDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateSubtask = ({
  sub_task_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  sub_task_name,
  time_create,
}) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    dispatch(getSubtaskDetail(taskId, sub_task_id))
  }
  return (
    <DialogMessageWrap
      {...{
        user_create_name,
        user_create_avatar,
        user_create_position,
        time_create,
      }}
      isHideFooterIcon
      onClickViewDetail={onClickViewDetail}
      taskName="chỉnh sửa công việc con"
    >
      <>
        {sub_task_name}
      </>
    </DialogMessageWrap>
  );
}

UpdateSubtask.propTypes = {

};

export default UpdateSubtask;
