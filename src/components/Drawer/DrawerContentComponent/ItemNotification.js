import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { withRouter } from 'react-router-dom';
// import * as image from '../../../assets/index';
import NotificationItemCommon from '../../NotificationItemCommon';
import '../Drawer.scss';

const ItemNotification = props => {
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
        key={item.id}
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
            <div
              className="text-name-message content-text"
              dangerouslySetInnerHTML={{
                __html: item.data_notification.content
              }}
            ></div>
          </div>
          <div className="des-message">
            <span>{item.data_notification.time_label}</span>
          </div>
        </div>
      </div>
    </NotificationItemCommon>
  );
};

export default withRouter(ItemNotification);
