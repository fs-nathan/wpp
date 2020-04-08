import { Avatar } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';

const ChatSticker = ({
  handleReplyChat,
  id,
  sticker,
  user_create_avatar,
  user_create_name,
  time_create,
  user_create_position,
  user_create_roles,
  isReply,
  is_me,
  chatPosition = "top",
}) => {

  return (
    <div className={clsx("ChatSticker", `ImageMessage__${chatPosition}`)} >
      {!isReply && !is_me &&
        <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
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
          <div className={clsx("ImageMessage--wrap")} >
            <img className="ImageMessage--img" src={sticker} alt="hd" />
          </div>
        </div>
        {!isReply &&
          <div className={clsx("TextMessage--time", { "TextMessage--time__self": is_me })} >
            {time_create}
          </div>
        }
      </div>

    </div>
  );
}

ChatSticker.propTypes = {

};

export default ChatSticker;
