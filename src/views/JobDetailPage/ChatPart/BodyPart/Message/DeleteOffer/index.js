import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';

const DeleteOffer = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  offer_content,
  time_create,
  chat_parent,
  isReply,
  is_me,
  chatPosition = "top",
}) => {

  return (
    <div className={clsx("DeleteOffer", "DeleteSubTask", `TextMessage__${chatPosition}`)} >
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
        Đã xoá đề xuất lúc {time_create}
      </div>
      <div className="DeleteSubTask--content" >
        {offer_content}
      </div>

    </div>
  );
}

DeleteOffer.propTypes = {

};

export default DeleteOffer;
