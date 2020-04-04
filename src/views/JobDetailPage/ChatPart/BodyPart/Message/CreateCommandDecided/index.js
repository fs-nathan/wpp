import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';

const CreateCommandDecided = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  command_content,
  command_type,
  time_create,
  isReply,
  is_me,
  chatPosition = "top",
}) => {


  return (
    <div className={clsx("CreateCommandDecided", `TextMessage__${chatPosition}`)} >
      <div className="UpdateTaskNameMessage--header" >
        Thông báo
      </div>
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
      <div className="UpdateTaskNameMessage--title" >
        {command_type === 0 ? "chỉ đạo" : "quyết định"}
      </div>
      <div className="UpdateTaskNameMessage--content" >
        {command_content}
      </div>
      {!isReply &&
        <div className={clsx("UpdateTaskNameMessage--time", { "TextMessage--time__self": is_me })} >
          {time_create}
        </div>
      }

    </div>
  );
}

CreateCommandDecided.propTypes = {

};

export default CreateCommandDecided;
