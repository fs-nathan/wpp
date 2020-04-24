import { getRemindDetail } from 'actions/chat/chat';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const DeleteRemind = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  remind_name,
  remind_id,
  time_create,
}) => {
  const dispatch = useDispatch();
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);

  function onClickViewDetail() {
    dispatch(getRemindDetail(taskId, remind_id))
  }
  return (
    <DialogMessageWrap
      {...{
        user_create_name,
        user_create_avatar,
        user_create_position,
        time_create,
      }}
      // isHideFooterIcon
      onClickViewDetail={onClickViewDetail}
      taskName="xoá nhắc hẹn"
    >
      <>
        {remind_name}
      </>
    </DialogMessageWrap>
  );
}

DeleteRemind.propTypes = {

};

export default DeleteRemind;
