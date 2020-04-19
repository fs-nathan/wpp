import React from 'react';
import DialogMessageWrap from '../DialogMessageWrap';
import './styles.scss';

const DeleteSubTask = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  sub_task_name,
  content,
  time_create,
  chat_parent,
  isReply,
  is_me,
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
      taskName="xoá công việc con"
    >
      <>
        {sub_task_name}
      </>
    </DialogMessageWrap>
  );
}

DeleteSubTask.propTypes = {

};

export default DeleteSubTask;
