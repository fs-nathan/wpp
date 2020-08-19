import { showImagesList } from 'actions/chat/chat';
import { detailUser } from 'actions/user/detailUser';
import clsx from 'clsx';
import { getUpdateProgressDate, getFileType } from 'helpers/jobDetail/stringHelper';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import EmotionReact from 'views/JobDetailPage/ChatComponent/EmotionReact';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
import CommonMessageAction from '../CommonMessageAction';
import './styles.scss';
import { isOneOf } from 'helpers/jobDetail/arrayHelper';
import { FileType } from 'components/FileType';
import * as fileType from 'assets/fileType';
import Icon from '@mdi/react';
import ReactPlayer from 'react-player';
import { Avatar, ListItem, ListItemText, Typography } from '@material-ui/core';
import styled from 'styled-components';
import { mdiPlayCircle } from '@mdi/js';
import { useTranslation } from 'react-i18next';

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

function ImagePlace(t, file, user_create_avatar, user_create_name, time_create, media_type) {
  if (media_type === 1 || FileType(getFileType(file.name)) === fileType.video)
    return (<div className="FileMessage--videoCover" >
      <Icon className="FileMessage--videoPlayButton" path={mdiPlayCircle}></Icon>
      <ReactPlayer
        className="FileMessage--videoPlayer"
        url={file.url}
        height="auto" width="100%"
      />
      {user_create_avatar &&
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
    </div>)
  return (<img className={clsx("ImageMessage--img")} src={file.url_thumbnail || file.url} alt="hd" />)
}

const ImageMessage = ({
  handleReplyChat,
  handleForwardChat,
  handleDetailEmotion,
  id,
  images = [],
  user_create_id,
  user_create_avatar,
  user_create_name,
  time_create = Date.now(),
  user_create_position,
  user_create_roles = [],
  data_emotion = [],
  media_type,
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

  const handleClickOpen = (idx) => () => {
    const user = { user_create_avatar, user_create_name, time_create, user_create_position };
    dispatch(showImagesList(true, images, idx, user));
  };

  function onClickAvatar() {
    dispatch(detailUser({ userId: user_create_id }))
  }

  let showImages = images;
  const imgNum = (isReply ? 5 : 6);
  const plusImage = images.length - imgNum;
  if (plusImage > 0) {
    showImages = images.slice(0, imgNum);
  }

  return (
    <div
      id={id}
      className={clsx("ImageMessage", {
        [`ImageMessage__${chatPosition}`]: !isReply,
        [`TextMessage__reply`]: isReply,
      }
      )} >
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
      <div className={clsx("ImageMessage--rightContentWrap", {
        "TextMessage--reply": isReply,
        "ImageMessage--rightContentWrap__self": is_me
      })}
        style={{ borderLeft: isReply ? `2px solid ${groupActiveColor}` : 'none' }}
      >
        {
          ((chatPosition === 'top' && !is_me) || isReply) &&
          <div className={clsx("ImageMessage--sender",
            { "ImageMessage--sender__reply": isReply })}  >
            {isReply &&
              <Avatar className="TextMessage--avatarReply" src={user_create_avatar} />
            }
          </div>
        }
        <abbr
          className="TextMessage--tooltip"
          title={!isReply ? getUpdateProgressDate(time_create, dateFormat) : ''}>
          <div className="ImageMessage--imagesContainer" >
            {
              showImages.map((image, i) =>
                <div key={image.url_thumbnail || image.url} onClick={handleClickOpen(i)}
                  className={clsx("ImageMessage--wrap",
                    `ImageMessage--wrap__total${showImages.length}-${i + 1}`,
                    `ImageMessage--wrap__number${i + 1}`,
                    { 'ImageMessage--wrap__reply': isReply }
                  )} >

                  {
                    (plusImage > 0 && !isReply && i === 5) ? (
                      <div className={clsx("ImageMessage--plus")} onClick={handleClickOpen(5)} >
                        {ImagePlace(t, image, user_create_avatar, user_create_name, time_create, media_type)}
                        <div className={clsx("ImageMessage--plusText")}>
                          <div className={clsx("ImageMessage--plusTextNumber")}>
                            +{plusImage}
                          </div>
                        </div>
                      </div>
                    )
                      :
                      ImagePlace(t, image, user_create_avatar, user_create_name, time_create, media_type)
                  }
                  {!isReply &&
                    <>
                      <div className="ImageMessage--quality" >
                        HD
                    </div>
                      <div className="ImageMessage--cover" >
                      </div>
                    </>
                  }
                </div>
              )
            }
            {
              (plusImage > 0) && isReply && (
                <div className={clsx("ImageMessage--wrap ImageMessage--plus",
                  { 'ImageMessage--plus__reply': isReply })}>
                  (+{plusImage})
                </div>
              )
            }
            {isUploading && uploadingPercent[id] !== 100 &&
              <div className="ImageMessage--loading" >
                <div className="ImageMessage--loadingBackground" >
                  <div className="ImageMessage--loadingPercent" style={{ width: `${uploadingPercent[id]}%`, backgroundColor: groupActiveColor }} >
                  </div>
                </div>
              </div>}
          </div>
        </abbr>
        {/* {!isReply &&
          <div className={clsx("TextMessage--time", { "TextMessage--time__self": is_me })} >
            {getUpdateProgressDate(time_create, dateFormat)}
          </div>
        } */}
        {data_emotion.length > 0 &&
          <EmotionReact chatId={id} is_me={is_me} data_emotion={data_emotion} handleDetailEmotion={handleDetailEmotion} />
        }
      </div>
      {
        !isReply && !is_me &&
        <CommonMessageAction can_delete={can_delete} chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />
      }
    </div >
  );
}

ImageMessage.propTypes = {
  images: PropTypes.array.isRequired,

};

export default ImageMessage;
