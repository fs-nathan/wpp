import { Avatar, ListItem, ListItemText, Typography } from '@material-ui/core';
import { mdiDownload, mdiPlayCircle } from '@mdi/js';
import Icon from '@mdi/react';
import { showImagesList } from 'actions/chat/chat';
import { actionDownloadFile } from 'actions/documents';
import { openDocumentDetail } from 'actions/system/system';
import { detailUser } from 'actions/user/detailUser';
import clsx from 'clsx';
import { isOneOf } from 'helpers/jobDetail/arrayHelper';
import { getFileType, getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import EmotionReact from 'views/JobDetailPage/ChatComponent/EmotionReact';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import CommonMessageAction from '../CommonMessageAction';
import TextMessage from '../TextMessage';
import './styles.scss';
import * as fileType from 'assets/fileType';
import { FileType } from 'components/FileType';

const TitleImg = styled(Typography)`
    & > li {
        padding: 10px 10px 10px 0;
        & > div:nth-child(1) {
            margin-right: 7px;
        }
        & > div:nth-child(2) {
            & > div:nth-child(1) {
                color: white;
                font-size: 15px
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                max-width: 100%;
            }
            & > div:nth-child(2) {
                color: #9c9797;
                font-size: 13px
            }
        }
    }
`

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
      dispatch(openDocumentDetail({ ...file, type: type }));
    }
  }

  function onClickVideo(file, idx) {
    return () => {
      const user = { user_create_avatar, user_create_name, time_create, user_create_position };
      dispatch(showImagesList(true, files, idx, user));
    }
  }

  function onClickAvatar() {
    dispatch(detailUser({ userId: user_create_id }))
  }
  return (
    <div
      id={id}
      className={clsx("FileMessage",
        {
          [`TextMessage__${chatPosition}`]: !isReply,
          [`TextMessage__reply`]: isReply,
        }) + " " + (files.length === 1 && files[0].media_type === 1 ? is_me ? "section-chat-video-of-me" : "section-chat-video-of-other" : "")}  >
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
            "FileMessage--content__video": files.length === 1 && files[0].memedia_type === 1 && !isUploading,
          })} >
            {chat_parent &&
              <TextMessage {...chat_parent} isReply></TextMessage>
            }
            {files.map((file, i) => (file.media_type === 1 && !isUploading) ?
              (<div className="FileMessage--files FileMessage--video"
                key={file.id || i}
                onClick={onClickVideo(file, i)}>
                <div className="FileMessage--videoCover" >
                  <div style={{display: "flex", position: "relative"}}>
                    <img style={{width: "100%", borderTopLeftRadius: "5px", borderTopRightRadius: "5px"}} src={file.url_thumbnail} />
                    {!isReply &&
                      <Icon className="FileMessage--videoPlayButton" path={mdiPlayCircle}></Icon>
                    }
                  </div>
                  {!isReply &&
                    <Typography className="FileMessage--videoInfo" component={'div'}>
                      <TitleImg component='div'>
                        <ListItem>
                          {user_create_avatar && <Avatar src={user_create_avatar} />}
                          <ListItemText
                            style={{ margin: 0 }}
                            primary={
                              <Typography component='div'>
                                {file.name}
                              </Typography>
                            }
                            secondary={
                              <Typography component='div'>
                                {t('LABEL_CHAT_TASK_DANG_LUC_USER_TIME', { user: user_create_name, time: `${getUpdateProgressDate(time_create, 'dd/MM/yyyy')} - ${file.size}` })}
                              </Typography>
                            }
                          />
                        </ListItem>
                      </TitleImg>
                    </Typography>
                  }
                </div>
              </div>)
              :
              (<div className="FileMessage--files" key={file.id || i}
                onClick={onClickFile(file, i)}>
                <img className={clsx("FileMessage--icon", { "FileMessage--icon__reply": isReply })}
                  src={file.file_icon} alt="file-icon"></img>
                <div
                  className={clsx("FileMessage--fileName", { "FileMessage--fileName__self": is_me, "FileMessage--fileName__reply": isReply })}>
                  <div className="FileMessage--fileNameLabel" >
                    {file.name}
                  </div>
                  <div className={clsx("FileMessage--fileSize", { "FileMessage--fileSize__self": is_me, "FileMessage--fileSize__reply": isReply })}>
                    <span className="info-file-in-chat-section">{file && file.type} - {file && file.size}</span>
                    <div className="icon-download-file-in-chat-section"
                      onClick={onClickDownload(file)}>
                      <Icon className={clsx("FileMessage--download", { "FileMessage--download__reply": isReply || is_me })} path={mdiDownload}></Icon>
                    </div>
                  </div>
                  {isUploading && uploadingPercent[id] !== 100 &&
                    <div className="FileMessage--loading" >{t('LABEL_CHAT_TASK_DANG_TAI')}<div className="FileMessage--loadingBackground" >
                      <div className="FileMessage--loadingPercent" style={{ width: `${uploadingPercent[id]}%` }} >
                      </div>
                    </div>
                      {uploadingPercent[id]}%
              </div>
                  }
                </div>
              </div>
              ))}
          </div>
          {data_emotion.length > 0 &&
            <EmotionReact chatId={id} is_me={is_me} data_emotion={data_emotion} handleDetailEmotion={handleDetailEmotion} />
          }
        </abbr>
      </div>
      {
        !isReply && !is_me &&
        <CommonMessageAction can_delete={can_delete} chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />
      }
    </div >
  )
}

FileMessage.propTypes = {
  files: PropTypes.array.isRequired,

};

export default FileMessage;
