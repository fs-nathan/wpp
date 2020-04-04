import { Avatar } from '@material-ui/core';
import { mdiAlarm } from '@mdi/js';
import Icon from '@mdi/react';
import { showTab } from 'actions/taskDetail/taskDetailActions';
import clsx from 'clsx';
import React from 'react';
import { useDispatch } from 'react-redux';
import './styles.scss';

const RemindMessage = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  remind_name,
  content,
  time_create,
  chat_parent,
  isReply,
  is_me,
  chatPosition = "top",
}) => {
  const dispatch = useDispatch();

  function onClickViewDetail() {
    dispatch(showTab(3))
  }

  return (
    <div className={clsx("RemindMessage", "UpdateTaskNameMessage", `TextMessage__${chatPosition}`)} >
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
        Nhắc hẹn công việc
      </div>
      <div className="UpdateTaskNameMessage--content" >
        {remind_name}
      </div>
      {!isReply &&
        <div className={clsx("UpdateTaskNameMessage--time", { "TextMessage--time__self": is_me })} >
          {time_create}
          <span className="CreateNewSubTask--detail" onClick={onClickViewDetail}>
            <Icon className="RemindMessage--icon" path={mdiAlarm}></Icon>Xem chi tiết
          </span>
        </div>
      }

    </div>
  );
}

RemindMessage.propTypes = {

};

export default RemindMessage;
