import { getDemandDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const UpdateCommandDecided = ({
  command_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  command_content,
  command_type,
  time_create,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    dispatch(getDemandDetail(taskId, command_id))
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
      taskName={command_type === 0 ? "chỉnh sửa chỉ đạo" : "chỉnh sửa quyết định"}
    >
      <>
        {command_content}
      </>
    </DialogMessageWrap>
  );
}

UpdateCommandDecided.propTypes = {

};

export default UpdateCommandDecided;