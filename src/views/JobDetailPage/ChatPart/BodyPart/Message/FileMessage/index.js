import { Avatar } from '@material-ui/core';
import { mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import CommonMessageAction from '../CommonMessageAction';
import TextMessage from '../TextMessage';
import './styles.scss';

const FileMessage = ({
  files = [],
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

  function onClickDownload(url, name) {
    return () => {
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      link.target = '_blank';
      link.click();
    }
  }

  return (
    <div className={clsx("FileMessage", `TextMessage__${chatPosition}`)}  >
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
          {chat_parent &&
            <TextMessage {...chat_parent} isReply></TextMessage>
          }
          {files[0] &&
            <div className="FileMessage--files">
              <img className="FileMessage--icon" src={files[0].file_icon} alt="file-icon"></img>
              <div className="FileMessage--fileName">
                {files[0].name}
              </div>
              <div className="FileMessage--downloadButton"
                onClick={onClickDownload(files[0].url, files[0].name)}>
                <Icon className="FileMessage--download" path={mdiDownload}></Icon>
              </div>
            </div>
          }
        </div>
        {!isReply &&
          <div className={clsx("TextMessage--time", { "TextMessage--time__self": is_me })} >
            {time_create}
            <span className="FileMessage--fileSize">
              {files[0] && files[0].size}
            </span>
          </div>
        }
      </div>
      {!isReply && !is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat}></CommonMessageAction>
      }
    </div >
  );
}

FileMessage.propTypes = {
  file: PropTypes.string.isRequired,

};

export default FileMessage;
