import { getSubtaskDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const CreateNewSubTask = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  sub_task_name,
  time_create,
  sub_task_id,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    dispatch(getSubtaskDetail(taskId, sub_task_id))
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
      onClickViewDetail={onClickViewDetail}
      taskName="Tạo công việc con"
    >
      <>
        {sub_task_name}
      </>
    </DialogMessageWrap>
  );
}

CreateNewSubTask.propTypes = {

};

export default CreateNewSubTask;
