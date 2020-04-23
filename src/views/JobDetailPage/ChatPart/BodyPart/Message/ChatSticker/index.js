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
  user_create_roles = [],
  isReply,
  is_me,
  chatPosition = "top",
}) => {

  return (
    <div className={clsx("ChatSticker", `TextMessage__${chatPosition}`)} >
      {!isReply && !is_me &&
        <abbr title={user_create_name}>
          <Avatar className={clsx("TextMessage--avatar", { 'TextMessage--avatar__hidden': chatPosition !== 'top' })} src={user_create_avatar} />
        </abbr>
      }
      <div className={clsx("ImageMessage--rightContentWrap", { "ImageMessage--rightContentWrap__self": is_me })} >
        <div className="ImageMessage--imagesContainer" >
          <abbr className="TextMessage--tooltip" title={!isReply ? time_create : ''}>
            <div className={clsx("ImageMessage--wrap")} >
              <img className="ImageMessage--img" src={sticker} alt="hd" />
            </div>
          </abbr>
        </div>
      </div>

    </div>
  );
}

ChatSticker.propTypes = {

};

export default ChatSticker;
