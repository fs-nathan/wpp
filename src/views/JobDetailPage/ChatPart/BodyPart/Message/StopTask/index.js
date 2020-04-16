import { Avatar } from '@material-ui/core';
import { mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';

const StopTask = ({
  handleReplyChat,
  id,
  user_create_name,
  user_create_avatar,
  user_create_position,
  user_create_roles = [],
  new_task_name,
  time_create,
  isReply,
  is_me,
  chatPosition = "top",
  title = "Đổi tên công việc"
}) => {


  return (
    <div className={clsx("StopTask", "UpdateTaskNameMessage", `TextMessage__${chatPosition}`)} >
      <div className="UpdateTaskNameMessage--header" >
        Thông báo
      </div>
      <div className="UpdateTaskNameMessage--sender" >
        <Avatar className="UpdateTaskNameMessage--avatarReply" src={user_create_avatar} />
        <div className="UpdateTaskNameMessage--name" >
          {user_create_name}
        </div>
        <div className="UpdateTaskNameMessage--position" >
          {user_create_position}
        </div>
        {user_create_roles[0] &&
          <div className="UpdateTaskNameMessage--room"  >
            {user_create_roles[0]}
          </div>
        }
      </div>
      <div className="UpdateTaskNameMessage--title" >
        {"Tạm dừng công việc"}
      </div>
      <Icon className="StopTask--icon" path={mdiTimerOff}></Icon>
      <div className="UpdateTaskNameMessage--content" >
        Lúc {time_create}
      </div>
      <div className="StopTask--notify" >
        {"Tiến độ công việc sẽ chạy lại sau khi bỏ tạm dừng!"}
      </div>
      {!isReply &&
        <div className={clsx("UpdateTaskNameMessage--time", { "TextMessage--time__self": is_me })} >
          {time_create}
        </div>
      }

    </div>
  );
}

StopTask.propTypes = {

};

export default StopTask;
