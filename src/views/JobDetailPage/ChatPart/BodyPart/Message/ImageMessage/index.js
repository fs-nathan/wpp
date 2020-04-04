import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import ModalImage from 'views/JobDetailPage/ModalImage';
import CommonMessageAction from '../CommonMessageAction';
import './styles.scss';

const ImageMessage = ({
  handleReplyChat,
  id,
  images,
  user_create_avatar,
  user_create_name,
  time_create,
  user_create_position,
  user_create_roles,
  isReply,
  is_me,
  chatPosition = "top",
}) => {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  }

  return (
    <div className={clsx("ImageMessage", `ImageMessage__${chatPosition}`)} >
      {!isReply && !is_me &&
        <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
      }
      {!isReply && is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat}></CommonMessageAction>
      }
      <div className={clsx("ImageMessage--rightContentWrap", { "ImageMessage--rightContentWrap__self": is_me })} >
        {
          chatPosition === 'top' && !is_me &&
          <div className="ImageMessage--sender"  >
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
            images.map(({ url }, i) =>
              <div key={url} onClick={handleClickOpen}
                className={clsx("ImageMessage--wrap", `ImageMessage--wrap__total${images.length}-${i + 1}`, `ImageMessage--wrap__number${i + 1}`)} >
                <div className="ImageMessage--quality" >
                  HD
            </div>
                <img className="ImageMessage--img" src={url} alt="hd" />
              </div>
            )
          }
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
