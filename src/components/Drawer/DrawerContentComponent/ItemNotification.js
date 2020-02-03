import React from 'react';
import Avatar from '@material-ui/core/Avatar';

// import * as image from '../../../assets/index';

import '../Drawer.scss';

const ItemNotification = props => {
  const { item } = props;

  const getCreateToNow = () => {
    let sAgo = '';

    sAgo = item.data_notification.time_label.replace(/&#x2F;/g, '/');
    return sAgo;
  };

  return (
    <div
      className={`item-message ${item.isViewed ? '' : 'un-read'}`}
      key={item.id}
      onClick={props.handleViewNotification}
    >
      <div className="avatar-item-message">
        <Avatar
          alt="Remy Sharp"
          src={item.user_from.avatar}
          className="avatar"
        />
        {!item.isViewed && <span className="badge-un-read"></span>}
      </div>
      <div>
        <div className="name-message">
          <span className="text-name-message">
            {item.data_notification.content}
          </span>
        </div>
        <div className="des-message">
          <span>{getCreateToNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemNotification;
