import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import NotificationItemCommon from '../../../components/NotificationItemCommon';
import '../Message.scss';

const NotificationRightItem = props => {
  const { item } = props;
  // const getCreateToNow = () => {
  //   let sAgo = '';

  //   sAgo = item.data_notification.time_label.replace(/&#x2F;/g, '/');
  //   return sAgo;
  // };
  return (
    <NotificationItemCommon
      handleViewNotification={props.handleViewNotification}
      item={item}
    >
      <div
        className={`item-message ${item.isViewed ? '' : 'un-read'}`}
        key={item.data_notification.id}
      >
        <div className="avatar-item-message">
          <Avatar alt="avatar" src={item.user_from.avatar} className="avatar" />
          {!item.isViewed && <span className="badge-un-read"></span>}
        </div>
        <div className="text-description">
          <div className="name-message">
            <span className="text-name-message">
              {item.data_notification.content}
            </span>
            {/* <span>{item.data_notification.time_label}</span> */}
          </div>
          <div className="des-message">
            <span>{item.data_notification.time_label}</span>
          </div>
        </div>
      </div>
    </NotificationItemCommon>
  );
};

export default NotificationRightItem;
