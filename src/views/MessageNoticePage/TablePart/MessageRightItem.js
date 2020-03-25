import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';
import '../Message.scss';

const MessageRightItem = props => {
  const { item } = props;
  // const getCreateToNow = () => {
  //   let sAgo = '';

  //   sAgo = item.time_label.replace(/&#x2F;/g, '/');
  //   return sAgo;
  // };
  const handleClick = () => {
    if (props.handleViewNotification) props.handleViewNotification();
    if (item.url_redirect) {
      props.history.push({ pathname: item.url_redirect });
    }
  };
  return (
    <div
      className={`item-message ${item.is_viewed ? '' : 'un-read'}`}
      key={item.task_id}
      onClick={handleClick}
    >
      <div className="avatar-item-message">
        <Avatar alt="avatar" src={item.user_create_avatar} className="avatar" />
        {!item.is_viewed && <span className="badge-un-read"></span>}
      </div>
      <div className="text-description">
        <div className="name-message">
          <span className="text-name-message">{item.task_name}</span>
          <span>{item.time_label}</span>
        </div>
        <div className="des-message">
          <div
            className="content-text"
            dangerouslySetInnerHTML={{ __html: item.content }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(MessageRightItem);
