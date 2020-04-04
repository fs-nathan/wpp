import { Avatar } from '@material-ui/core';
import { mdiTimerOff } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import React from 'react';
import './styles.scss';

const CancelStopTask = ({
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
    <div className={clsx("CancelStopTask", "UpdateTaskNameMessage", `TextMessage__${chatPosition}`)} >
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
        {"Bỏ Tạm dừng công việc"}
      </div>
      <Icon className="CancelStopTask--icon" path={mdiTimerOff}></Icon>
      <div className="UpdateTaskNameMessage--content" >
        Lúc {time_create}
      </div>
      <div className="CancelStopTask--notify" >
        {"Tiến độ công việc sẽ tiếp tục tính từ thời điểm này"}
      </div>
      {!isReply &&
        <div className={clsx("UpdateTaskNameMessage--time", { "TextMessage--time__self": is_me })} >
          {time_create}
        </div>
      }

    </div>
  );
}

CancelStopTask.propTypes = {

};

export default CancelStopTask;
