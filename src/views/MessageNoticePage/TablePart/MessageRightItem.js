import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import '../Message.scss';

const MessageRightItem = props => {
  const { item } = props;
  const getCreateToNow = () => {
    let sAgo = '';

    sAgo = item.time_label.replace(/&#x2F;/g, '/');
    return sAgo;
  };
  return (
    <div
      className={`item-message ${item.is_viewed ? '' : 'un-read'}`}
      key={item.task_id}
      onClick={props.handleViewNotification}
    >
      <div className="avatar-item-message">
        <Avatar
          alt="Remy Sharp"
          src={item.user_create_avatar}
          className="avatar"
        />
        {!item.is_viewed && <span className="badge-un-read"></span>}
      </div>
      <div className="text-description">
        <div className="name-message">
          <span className="text-name-message">{item.task_name}</span>
          <span>{getCreateToNow()}</span>
        </div>
        <div className="des-message">
          <span>{item.content}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageRightItem;
