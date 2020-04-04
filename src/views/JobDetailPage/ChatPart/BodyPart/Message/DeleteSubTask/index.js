import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
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
    <div className={clsx("DeleteSubTask", `TextMessage__${chatPosition}`)} >
      <div className="UpdateTaskNameMessage--sender" >
        <Avatar className="TextMessage--avatarReply" src={user_create_avatar} />
        <div className="TextMessage--name" >
          {user_create_name}
        </div>
        <div className="TextMessage--position" >
          {user_create_position}
        </div>
        {user_create_roles[0] &&
          <div className="TextMessage--room"  >
            {user_create_roles[0]}
          </div>
        }
      </div>
      <div className="DeleteSubTask--title" >
        Đã xoá công việc con lúc {time_create}
      </div>
      <div className="DeleteSubTask--content" >
        {sub_task_name}
      </div>

    </div>
  );
}

DeleteSubTask.propTypes = {

};

export default DeleteSubTask;
