import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

const UpdateTaskNameMessage = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  new_task_name,
  time_create,
  isReply,
  is_me,
  chatPosition = "top",
  title = "Đổi tên công việc"
}) => {


  return (
    <div className={clsx("UpdateTaskNameMessage", `TextMessage__${chatPosition}`)} >
      <div className="UpdateTaskNameMessage--header" >
        Thông báo
      </div>
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
      <div className="UpdateTaskNameMessage--title" >
        {title}
      </div>
      <div className="UpdateTaskNameMessage--content" >
        {new_task_name}
      </div>
      {!isReply &&
        <div className={clsx("UpdateTaskNameMessage--time", { "TextMessage--time__self": is_me })} >
          {time_create}
        </div>
      }

    </div>
  );
}

UpdateTaskNameMessage.propTypes = {
  new_task_name: PropTypes.string,

};

export default UpdateTaskNameMessage;
