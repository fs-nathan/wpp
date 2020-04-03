import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import CommonMessageAction from '../CommonMessageAction';
import './styles.scss';

const UpdateDurationMessage = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  new_task_name,
  time_changes = [],
  time_create,
  chat_parent,
  isReply,
  is_me,
  chatPosition = "top",
}) => {

  return (
    <div className={clsx("UpdateDurationMessage", "UpdateTaskNameMessage", `TextMessage__${chatPosition}`)} >
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
        Cập nhật tiến độ
      </div>
      <div className="UpdateTaskNameMessage--content" >
        {time_changes[0] && `Bắt đầu: Từ ${time_changes[0].old} sang ${time_changes[0].new}`}
        <br />
        {time_changes[1] && `Kết thúc: Từ ${time_changes[1].old} sang ${time_changes[1].new}`}
      </div>
      {!isReply &&
        <div className={clsx("UpdateTaskNameMessage--time", { "TextMessage--time__self": is_me })} >
          {time_create}
        </div>
      }
      {!isReply && !is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat}></CommonMessageAction>
      }
    </div>
  );
}

UpdateDurationMessage.propTypes = {

};

export default UpdateDurationMessage;
