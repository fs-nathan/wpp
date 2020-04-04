import { Avatar } from '@material-ui/core';
import { mdiSignCaution } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import CommonMessageAction from '../CommonMessageAction';
import './styles.scss';

const DeleteFile = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  content,
  time_create,
  chat_parent,
  isReply,
  is_me,
  chatPosition = "top",
}) => {

  return (
    <div className={clsx("DeleteFile", "TextMessage", `TextMessage__${chatPosition}`)}  >
      {!isReply && !is_me &&
        <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
      }
      <div className={clsx("TextMessage--rightContentWrap",
        `TextMessage--rightContentWrap__${chatPosition}`,
        {
          "TextMessage--reply": isReply,
          "TextMessage--rightContentWrap__self": is_me
        })}
      >
        {
          chatPosition === 'top' && !is_me &&
          <div className="TextMessage--sender"  >
            {isReply &&
              <Avatar className="TextMessage--avatarReply" src={user_create_avatar} />
            }
            <div className="TextMessage--name"  >
              {user_create_name}
            </div>
            <div className="TextMessage--position"  >
              {user_create_position}
            </div>
            {user_create_roles[0] &&
              <div className="TextMessage--room"  >
                {user_create_roles[0]}
              </div>
            }
          </div>
        }
        <div className={clsx("TextMessage--content", { "TextMessage--content__self": is_me })} >
          <Icon path={mdiSignCaution}></Icon>
          <div>
            {"File không tồn tại!"}
          </div>
          <div>
            {"Tài liệu bị xoá hoặc không tồn tại!"}
          </div>
        </div>
        {!isReply &&
          <div className={clsx("TextMessage--time", { "TextMessage--time__self": is_me })} >
            {time_create}
          </div>
        }
      </div>
      {!isReply && !is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat}></CommonMessageAction>
      }
    </div >
  );
}

DeleteFile.propTypes = {

};

export default DeleteFile;
