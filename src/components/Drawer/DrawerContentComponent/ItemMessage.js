import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';

import '../Drawer.scss';

const ItemMessage = props => {
  const { item } = props;
  const handleClick = () => {
    if (props.handleViewNotification) props.handleViewNotification();
    if (item.url_redirect) {
      props.history.push({ pathname: item.url_redirect });
    }
    if (props.handleCloseDrawer) props.handleCloseDrawer();
  };
  return (
    <div
      className={`item-message ${item.is_viewed ? '' : 'un-read'}`}
      key={item.id}
      onClick={handleClick}
    >
      <div className="avatar-item-message">
        <Avatar
          alt="Remy Sharp"
          src={item.user_create_avatar}
          className="avatar"
        />
        {!item.is_viewed && <span className="badge-un-read"/>}
      </div>
      <div>
        {item.task_name && (
          <div className="name-message">
            <span className="text-name-message">{item.task_name}</span>
          </div>
        )}
        <div className="name-message">
          <div
            className="text-name-message content-text"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
        <div className="des-message">
          <span>{item.time_label}</span>
        </div>
      </div>
    </div>
  );
};

export default withRouter(ItemMessage);
