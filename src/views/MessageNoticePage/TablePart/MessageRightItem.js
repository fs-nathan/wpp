import React from 'react';
import Avatar from '@material-ui/core/Avatar';

import * as image from '../../../assets';

import '../Message.scss';

const MessageRightItem = props => {
  const { item } = props;
  return (
    <div className={`item-message ${item.read ? '' : 'un-read'}`} key={item.id}>
      <div className="avatar-item-message">
        <Avatar alt="Remy Sharp" src={image.avatar_user} className="avatar" />
        {!item.read && <span className="badge-un-read"></span>}
      </div>
      <div className="text-description">
        <div className="name-message">
          <span className="text-name-message">{item.name}</span>
          {item.date && <span className="des-message">{item.date}</span>}
        </div>
        <div className="des-message">
          <span>{item.description}</span>
        </div>
      </div>
    </div>
  );
};

export default MessageRightItem;
