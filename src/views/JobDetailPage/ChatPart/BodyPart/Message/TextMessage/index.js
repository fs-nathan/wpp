import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import CommonMessageAction from '../CommonMessageAction';
import './styles.scss';

const TextMessage = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  content,
  time_create,
  chat_parent,
  isReply
}) => {

  return (
    <div className="TextMessage"  >
      {!isReply &&
        <Avatar className="TextMessage--avatar" src={user_create_avatar} />
      }
      <div className={clsx("TextMessage--rightContentWrap", { "TextMessage--reply": isReply })}  >
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
          <div className="TextMessage--room"  >
            {user_create_roles[0]}
          </div>
        </div>
        <div className="TextMessage--content"  >
          {chat_parent &&
            <TextMessage {...chat_parent} isReply></TextMessage>
          }
          {content}
        </div>
        {!isReply &&
          <div className="TextMessage--time"  >
            {time_create}
          </div>
        }
      </div>
      {!isReply &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat}></CommonMessageAction>
      }
    </div >
  );
}

TextMessage.propTypes = {
  user_create_name: PropTypes.string.isRequired,
};

export default TextMessage;
