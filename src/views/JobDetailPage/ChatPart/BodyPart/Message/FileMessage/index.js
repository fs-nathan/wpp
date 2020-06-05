import { Avatar } from '@material-ui/core';
import { mdiDownload } from '@mdi/js';
import Icon from '@mdi/react';
import { showImagesList } from 'actions/chat/chat';
import { actionDownloadFile } from 'actions/documents';
import { openDocumentDetail } from 'actions/system/system';
import { detailUser } from 'actions/user/detailUser';
import clsx from 'clsx';
import { getFileType, getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import EmotionReact from 'views/JobDetailPage/ChatComponent/EmotionReact';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import CommonMessageAction from '../CommonMessageAction';
import TextMessage from '../TextMessage';
import './styles.scss';
import { isOneOf } from 'helpers/jobDetail/arrayHelper';

function getPosition(chatPosition, i, length) {
  if (length === 1 || chatPosition === 'mid')
    return chatPosition;
  if (chatPosition === 'one') {
    if (i === 0)
      return 'top'
    if (i === length - 1)
      return 'bot'
    return 'mid'
  }
  if (chatPosition === 'top') {
    if (i === 0)
      return 'top'
    return 'mid'
  }
  if (chatPosition === 'bot') {
    if (i === length - 1)
      return 'bot'
    return 'mid'
  }
  return chatPosition
}

const FileMessage = ({
  files = [],
  handleReplyChat,
  handleForwardChat,
  handleDetailEmotion,
  id,
  user_create_id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  data_emotion = [],
  content,
  time_create = Date.now(),
  chat_parent,
  isReply,
  isUploading,
  is_me,
  can_delete,
  chatPosition = "top",
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const uploadingPercent = useSelector(state => state.chat.uploadingPercent);
  const groupActiveColor = useSelector(currentColorSelector)
  const dateFormat = useSelector(state => state.system.profile.format_date);

  function onClickDownload(file) {
    return (evt) => {
      actionDownloadFile(file)
      evt.stopPropagation();
    }
  }

  function onClickFile(file, idx) {
    const type = getFileType(file.name);
    return () => {
      if (type === 'mp4') {
        const user = { user_create_avatar, user_create_name, time_create, user_create_position };
        dispatch(showImagesList(true, files, idx, user));
      } else {
        dispatch(openDocumentDetail({ ...file, type: type }));
      }
    }
  }

  function onClickAvatar() {
    dispatch(detailUser({ userId: user_create_id }))
  }

  return (
    <div className={clsx("FileMessage",
      {
        [`TextMessage__${chatPosition}`]: !isReply,
        [`TextMessage__reply`]: isReply,
      })}  >
      {!isReply && !is_me &&
        <abbr title={user_create_name}>
          <Avatar onClick={onClickAvatar}
            className={clsx("TextMessage--avatar", {
              'TextMessage--avatar__hidden': isOneOf(chatPosition, ['bot', 'mid'])
            })} src={user_create_avatar} />
        </abbr>
      }
      {!isReply && is_me &&
        <CommonMessageAction can_delete={can_delete} isSelf chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />}
      <div className={clsx("TextMessage--rightContentWrap",
        is_me ? `TextMessage--rightContentWrap__self-${chatPosition}`
          : `TextMessage--rightContentWrap__${chatPosition}`,
        {
          "TextMessage--reply": isReply,
          "TextMessage--rightContentWrap__self": is_me
        })}
        style={{
          backgroundColor: is_me ? groupActiveColor : '#fff',
          borderLeft: isReply ? `2px solid ${groupActiveColor}` : 'none'
        }}
      >
        <abbr className="TextMessage--tooltip" title={!isReply ? getUpdateProgressDate(time_create, dateFormat) : ''}>
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
          <div className={clsx("TextMessage--content", {
            "TextMessage--content__self": is_me,
            "TextMessage--content__withReact": data_emotion.length > 0,
          })} >
            {chat_parent &&
              <TextMessage {...chat_parent} isReply></TextMessage>
            }
            {files.map((file, i) =>
              (<div className="FileMessage--files" key={file.id || i} onClick={onClickFile(file, i)}>
                <img className={clsx("FileMessage--icon", { "FileMessage--icon__reply": isReply })}
                  src={file.file_icon} alt="file-icon"></img>
                <div
                  className={clsx("FileMessage--fileName", { "FileMessage--fileName__self": is_me, "FileMessage--fileName__reply": isReply })}>
                  <div className="FileMessage--fileNameLabel" >
                    {file.name}
                  </div>
                  <div className={clsx("FileMessage--fileSize", { "FileMessage--fileSize__self": is_me, "FileMessage--fileSize__reply": isReply })}>
                    {getFileType(file.name)} - {file && file.size}
                  </div>
                  {isUploading && uploadingPercent !== 100 &&
                    <div className="FileMessage--loading" >{t('LABEL_CHAT_TASK_DANG_TAI')}<div className="FileMessage--loadingBackground" >
                      <div className="FileMessage--loadingPercent" style={{ width: `${uploadingPercent}%` }} >
                      </div>
                    </div>
                      {uploadingPercent}%
              </div>
                  }
                </div>
                <div className="FileMessage--downloadButton"
                  onClick={onClickDownload(file)}>
                  <Icon className={clsx("FileMessage--download", { "FileMessage--download__reply": isReply || is_me })} path={mdiDownload}></Icon>
                </div>
              </div>
              ))}
          </div>
          {data_emotion.length > 0 &&
            <EmotionReact chatId={id} is_me={is_me} data_emotion={data_emotion} handleDetailEmotion={handleDetailEmotion} />
          }
        </abbr>
      </div>
      {!isReply && !is_me &&
        <CommonMessageAction can_delete={can_delete} chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />
      }
    </div >
  )
}

FileMessage.propTypes = {
  files: PropTypes.array.isRequired,

};

export default FileMessage;
