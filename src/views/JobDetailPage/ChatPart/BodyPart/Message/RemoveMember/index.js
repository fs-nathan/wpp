import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import CommonMessageAction from '../CommonMessageAction';
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
        Đã xoá thành viên lúc {time_create}
      </div>
      <div className="DeleteSubTask--content" >
        <Avatar className="TextMessage--avatarReply" src={member_avatar} />
        {member_name}
      </div>
      {!isReply && !is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat}></CommonMessageAction>
      }
    </div>
  );
}

RemoveMember.propTypes = {

};

export default RemoveMember;
