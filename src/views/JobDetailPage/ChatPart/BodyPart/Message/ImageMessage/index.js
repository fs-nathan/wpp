import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import EmotionReact from 'views/JobDetailPage/ChatComponent/EmotionReact';
import ModalImage from 'views/JobDetailPage/ModalImage';
import CommonMessageAction from '../CommonMessageAction';
import './styles.scss';

const ImageMessage = ({
  handleReplyChat,
  handleForwardChat,
  handleDetailEmotion,
  id,
  images = [],
  user_create_avatar,
  user_create_name,
  time_create,
  user_create_position,
  user_create_roles = [],
  data_emotion = [],
  isReply,
  isUploading,
  is_me,
  chatPosition = "top",
}) => {
  const uploadingPercent = useSelector(state => state.chat.uploadingPercent);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  let showImages = images;
  const imgNum = (isReply ? 5 : 6);
  const plusImage = images.length - imgNum;
  if (plusImage > 0) {
    showImages = images.slice(0, imgNum);
  }

  return (
    <div className={clsx("ImageMessage", `ImageMessage__${chatPosition}`)} >
      {!isReply && !is_me &&
        <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
      }
      {!isReply && is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />}
      <div className={clsx("ImageMessage--rightContentWrap", {
        "TextMessage--reply": isReply,
        "ImageMessage--rightContentWrap__self": is_me
      })} >
        {
          ((chatPosition === 'top' && !is_me) || isReply) &&
          <div className={clsx("ImageMessage--sender",
            { "ImageMessage--sender__reply": isReply })}  >
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
        <div className="ImageMessage--imagesContainer" >
          {
            showImages.map(({ url }, i) =>
              <div key={url} onClick={handleClickOpen}
                className={clsx("ImageMessage--wrap",
                  `ImageMessage--wrap__total${showImages.length}-${i + 1}`,
                  `ImageMessage--wrap__number${i + 1}`,
                  { 'ImageMessage--wrap__reply': isReply }
                )} >
                {!isReply &&
                  <div className="ImageMessage--quality" >
                    HD
                    </div>
                }
                {
                  (plusImage > 0 && !isReply && i === 5) ? (
                    <div className={clsx("ImageMessage--plus")}>
                      <img className={clsx("ImageMessage--img", { 'ImageMessage--img__reply': isReply })} src={url} alt="hd" />
                      <div className={clsx("ImageMessage--plusText")}>
                        <div className={clsx("ImageMessage--plusTextNumber")}>
                          +{plusImage}
                        </div>
                      </div>
                    </div>
                  )
                    :
                    <img className={clsx("ImageMessage--img", { 'ImageMessage--img__reply': isReply })} src={url} alt="hd" />
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
          {isUploading &&
            <div className="ImageMessage--loading" >
              <div className="ImageMessage--loadingBackground" >
                <div className="ImageMessage--loadingPercent" style={{ width: uploadingPercent }} >
                </div>
              </div>
            </div>}
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
      <ModalImage images={images}
        {...{ user_create_avatar, user_create_name, time_create, user_create_position }}
        isOpen={open} handleClose={handleClose} handleClickOpen={handleClickOpen} />
    </div>
  );
}

ImageMessage.propTypes = {
  images: PropTypes.array.isRequired,

};

export default ImageMessage;
