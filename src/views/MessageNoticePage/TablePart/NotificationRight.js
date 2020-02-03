import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../Message.scss';
import NotificationRightItem from './NotificationRightItem';
import {
  getListNotification,
  actionViewNotification
} from '../../../components/Drawer/DrawerService';
import {
  getNumberNotificationNotViewer,
  actionChangeNumNotificationNotView
} from '../../../actions/system/system';

const MessageRight = props => {
  const [listNotification, setListNotification] = useState([]);
  const fetNotification = async params => {
    try {
      const { data } = await getListNotification(params);
      setListNotification(data.notifications);
    } catch (error) {}
  };
  useEffect(() => {
    let params = {};
    if (props.isNotView) {
      params = { not_viewed: true };
    }
    fetNotification(params); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    let params = {};
    if (props.isNotView) {
      params = { not_viewed: true };
    }
    fetNotification(params); // eslint-disable-next-line
  }, [props.isNotView]);
  const handleViewNotification = async message => {
    let params = {};
    if (props.isNotView) {
      params = { not_viewed: true };
    }
    if (props.isNotView) {
      await actionViewNotification({
        notification_id: message.data_notification.id
      });
      fetNotification(params);
      fetNumberNotificationNotViewer();
    }
  };
  const fetNumberNotificationNotViewer = async () => {
    try {
      const { data } = await getNumberNotificationNotViewer();
      props.actionChangeNumNotificationNotView(data.number_notification);
    } catch (error) {}
  };
  return (
    <div className="MessagePage">
      <div className="content-message">
        {listNotification.map((message, index) => (
          <NotificationRightItem
            item={message}
            key={index}
            handleViewNotification={() => handleViewNotification(message)}
          />
        ))}
      </div>
    </div>
  );
};

export default connect(state => ({}), {
  actionChangeNumNotificationNotView
})(MessageRight);
