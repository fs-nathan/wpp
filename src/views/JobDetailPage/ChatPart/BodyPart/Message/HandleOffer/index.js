import { Avatar } from '@material-ui/core';
import { mdiCloseCircle, mdiThumbUp } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import CommonMessageAction from '../CommonMessageAction';
import './styles.scss';

const HandleOffer = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  offer_content,
  handle_status,
  handle_content,
  time_create,
  isReply,
  is_me,
  chatPosition = "top",
}) => {


  return (
    <div className={clsx("HandleOffer", "UpdateTaskNameMessage", `TextMessage__${chatPosition}`)} >
      <div className="UpdateTaskNameMessage--header" >
        Thông báo
      </div>
      <div className="UpdateTaskNameMessage--sender" >
        <Avatar className="TextMessage--avatarReply" src={user_create_avatar} />
        <div className="TextMessage--name" >
          {user_create_name}
        </div>
        <div className="TextMessage--position" >
          {user_create_position}
        </div>
        {user_create_roles[0] &&
          <div className="TextMessage--room"  >
            {user_create_roles[0]}
          </div>
        }
      </div>
      <div className="UpdateTaskNameMessage--title" >
        {handle_status === 0 ? "Đồng ý đề xuất" : "Từ chối đề xuất"}
      </div>
      <div className="HandleOffer--icon">
        <Icon path={handle_status === 0 ? mdiThumbUp : mdiCloseCircle}></Icon>
      </div>
      <div className="CreateOffer--subTitle" >
        {time_create}
      </div>
      <div className="UpdateTaskNameMessage--content" >
        {handle_content}
      </div>
      <div className="HandleOffer--subContent" >
        {offer_content}
      </div>
      {!isReply &&
        <div className={clsx("UpdateTaskNameMessage--time", { "TextMessage--time__self": is_me })} >
          {time_create}
        </div>
      }
      {!isReply && !is_me &&
        <CommonMessageAction chatId={id} handleReplyChat={handleReplyChat}></CommonMessageAction>
      }
    </div>
  );
}

HandleOffer.propTypes = {

};

export default HandleOffer;
