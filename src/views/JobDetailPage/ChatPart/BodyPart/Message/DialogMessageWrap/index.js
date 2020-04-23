import { Avatar } from '@material-ui/core';
import { mdiAlarm } from '@mdi/js';
import Icon from '@mdi/react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

const DialogMessageWrap = ({
  user_create_name,
  user_create_avatar,
  user_create_position,
  time_create,
  chatPosition = "top",
  titleHeader = "Thông báo",
  taskName = "Đổi tên công việc",
  isHideFooterIcon = false,
  footerText = "Xem chi tiết",
  onClickViewDetail,
  className,
  children
}) => {

  return (
    <div className={clsx("DialogMessageWrap", className)} >
      <div className="DialogMessageWrap--header" >
        {titleHeader}
      </div>
      {user_create_name && <div className="DialogMessageWrap--sender" >
        <abbr title={user_create_name}>
          <Avatar className="DialogMessageWrap--avatar" src={user_create_avatar} />
        </abbr>
      </div>}
      <div className="DialogMessageWrap--title" >
        <span className="DialogMessageWrap--name" >
          {user_create_name}
        </span>
        <span className="DialogMessageWrap--position" >
          {user_create_position ? ` - ${user_create_position} ` : ' '}
        </span>
        <span className="DialogMessageWrap--task" >
          {`đã ${taskName}`}
        </span>
      </div>
      <div className="DialogMessageWrap--content" >
        {children}
        {time_create &&
          <div className={clsx("DialogMessageWrap--time")} >
            {`Lúc ${time_create}`}
          </div>
        }
      </div>
      <div className="DialogMessageWrap--footer" >
        {!isHideFooterIcon &&
          <Icon className="DialogMessageWrap--icon" path={mdiAlarm}></Icon>
        }
        <span className="DialogMessageWrap--detail" onClick={onClickViewDetail}>
          {footerText}
        </span>
      </div>
    </div>
  );
}

DialogMessageWrap.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DialogMessageWrap;
