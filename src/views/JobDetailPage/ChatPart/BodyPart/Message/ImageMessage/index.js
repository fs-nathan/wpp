import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import { getUpdateProgressDate } from 'helpers/jobDetail/stringHelper';
import PropTypes from 'prop-types';
import React from 'react';
import { useSelector } from 'react-redux';
import EmotionReact from 'views/JobDetailPage/ChatComponent/EmotionReact';
import ModalImage from 'views/JobDetailPage/ModalImage';
import { currentColorSelector } from 'views/JobDetailPage/selectors';
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
  time_create = Date.now(),
  user_create_position,
  user_create_roles = [],
  data_emotion = [],
  isReply,
  isUploading,
  is_me,
  chatPosition = "top",
}) => {
  const uploadingPercent = useSelector(state => state.chat.uploadingPercent);
  const groupActiveColor = useSelector(currentColorSelector)
  const dateFormat = useSelector(state => state.system.profile.format_date);

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
    <div className={clsx("ImageMessage", {
      [`ImageMessage__${chatPosition}`]: !isReply,
      [`TextMessage__reply`]: isReply,
    }
    )} >
      {!isReply && !is_me &&
        <abbr title={user_create_name}>
          <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
        </abbr>
      }
      {!isReply && is_me &&
        <CommonMessageAction isSelf chatId={id} handleReplyChat={handleReplyChat} handleForwardChat={handleForwardChat} />}
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
          {isUploading && uploadingPercent !== 100 &&
            <div className="ImageMessage--loading" >
              <div className="ImageMessage--loadingBackground" >
                <div className="ImageMessage--loadingPercent" style={{ width: `${uploadingPercent}%`, backgroundColor: groupActiveColor }} >
                </div>
              </div>
            </div>}
        </div>
        {!isReply &&
          <div className={clsx("TextMessage--time", { "TextMessage--time__self": is_me })} >
            {getUpdateProgressDate(time_create, dateFormat)}
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
