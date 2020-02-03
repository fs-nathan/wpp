import React from 'react';
import Avatar from '@material-ui/core/Avatar';

// import * as image from '../../../assets/index';

import '../Drawer.scss';

const ItemMessage = props => {
  const { item } = props;

  const getCreateToNow = () => {
    let sAgo = '';

    sAgo = item.time_label.replace(/&#x2F;/g, '/');
    return sAgo;
  };

  return (
    <div
      className={`item-message ${item.is_viewed ? '' : 'un-read'}`}
      key={item.id}
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
      <div>
        <div className="name-message">
          <span className="text-name-message">{item.content}</span>
        </div>
        <div className="des-message">
          <span>{getCreateToNow()}</span>
        </div>
      </div>
    </div>
  );
};

export default ItemMessage;
