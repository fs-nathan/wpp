import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';

const DeleteRemind = ({
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
    <div className={clsx("DeleteRemind", "DeleteSubTask", `TextMessage__${chatPosition}`)} >
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
        <span className="DeleteRemind__red">Đã xoá nhắc hẹn lúc </span> {time_create}
      </div>

    </div>
  );
}

DeleteRemind.propTypes = {

};

export default DeleteRemind;
