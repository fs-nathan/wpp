import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';

const RemoveMember = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  member_avatar,
  member_name,
  time_create,
  isReply,
  is_me,
  chatPosition = "top",
}) => {

  return (
    <div className={clsx("RemoveMember", "DeleteSubTask", `TextMessage__${chatPosition}`)} >
      <div className="UpdateTaskNameMessage--sender" >
        <Avatar className="UpdateTaskNameMessage--avatarReply" src={user_create_avatar} />
        <div className="UpdateTaskNameMessage--name" >
          {user_create_name}
        </div>
        <div className="UpdateTaskNameMessage--position" >
          {user_create_position}
        </div>
        {user_create_roles[0] &&
          <div className="UpdateTaskNameMessage--room"  >
            {user_create_roles[0]}
          </div>
        }
      </div>
      <div className="DeleteSubTask--title" >
        Đã xoá thành viên lúc {time_create}
      </div>
      <div className="DeleteSubTask--content" >
        <div className="RemoveMember--content" >
          <Avatar className="RemoveMember--avatar" src={member_avatar} />
          {member_name}
        </div>
      </div>

    </div>
  );
}

RemoveMember.propTypes = {

};

export default RemoveMember;
