import { Avatar } from '@material-ui/core';
import { mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import { openDocumentDetail } from 'actions/system/system';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmotionReact from 'views/JobDetailPage/ChatComponent/EmotionReact';
import CommonMessageAction from '../CommonMessageAction';
import TextMessage from '../TextMessage';
import './styles.scss';

const FileMessage = ({
  files = [],
  handleReplyChat,
  handleForwardChat,
  handleDetailEmotion,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  data_emotion = [],
  content,
  time_create,
  chat_parent,
  isReply,
  isUploading,
  is_me,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();
  const uploadingPercent = useSelector(state => state.chat.uploadingPercent);
  const [file] = files;
  const { name = '' } = file || {};
  const nameSplitted = name.split('.');
  const type = nameSplitted[nameSplitted.length - 1];

  function onClickDownload(url, name) {
    return () => {
      const link = document.createElement('a');
      link.href = url;
      link.download = name;
      link.target = '_blank';
      link.click();
    }
  }

  function onClickFile() {
    dispatch(openDocumentDetail({ ...file, type }));
  }

  return (
    <div className={clsx("FileMessage", `TextMessage__${chatPosition}`)}  >
      {!isReply && !is_me &&
        <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
      }
      {!isReply && is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />}
      <div className={clsx("TextMessage--rightContentWrap",
        `TextMessage--rightContentWrap__${chatPosition}`,
        {
          "TextMessage--reply": isReply,
          "TextMessage--rightContentWrap__self": is_me
        })}
      >
        {
          ((chatPosition === 'top' && !is_me) || isReply) &&
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
          {file &&
            <div className="FileMessage--files" onClick={onClickFile}>
              <img className={clsx("FileMessage--icon", { "FileMessage--icon__reply": isReply })}
                src={file.file_icon} alt="file-icon"></img>
              <div className={clsx("FileMessage--fileName", { "FileMessage--fileName__self": is_me, "FileMessage--fileName__reply": isReply })}>
                {file.name}
                <div className={clsx("FileMessage--fileSize", { "FileMessage--fileSize__self": is_me, "FileMessage--fileSize__reply": isReply })}>
                  {type} - {file && file.size}
                </div>
                {isUploading &&
                  <div className="FileMessage--loading" >
                    Đang tải:
                  <div className="FileMessage--loadingBackground" >
                      <div className="FileMessage--loadingPercent" style={{ width: uploadingPercent }} >
                      </div>
                    </div>
                    {uploadingPercent}%
              </div>
                }
              </div>
              <div className="FileMessage--downloadButton"
                onClick={onClickDownload(file.url, file.name)}>
                <Icon className={clsx("FileMessage--download", { "FileMessage--download__reply": isReply || is_me })} path={mdiDownload}></Icon>
              </div>
            </div>
          }
        </div>
        {!isReply &&
          <div className={clsx("TextMessage--time", { "TextMessage--time__self": is_me })} >
            {time_create}

          </div>
        }
        {data_emotion.length > 0 &&
          <EmotionReact data_emotion={data_emotion} handleDetailEmotion={handleDetailEmotion} />
        }
      </div>
      {!isReply && !is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />}
    </div >
  );
}

FileMessage.propTypes = {
  files: PropTypes.array.isRequired,

};

export default FileMessage;
