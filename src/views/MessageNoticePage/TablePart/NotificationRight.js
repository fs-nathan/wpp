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
import LoadingBox from '../../../components/LoadingBox';

let currentPage = 1;
const MessageRight = props => {
  const [listNotification, setListNotification] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState({ total_page: 1, page: 1 });

  const fetNotification = async params => {
    try {
      setLoading(true);
      const { data } = await getListNotification(params);
      setListNotification(data.notifications);
      setPage(data.paging);
      currentPage = data.paging.page;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
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

  // implement load more
  useEffect(() => {
    if (props.isLoadMore && currentPage < page.total_page) {
      handleLoadMore();
    }
    // eslint-disable-next-line
  }, [props.isLoadMore]);

  const handleLoadMore = async () => {
    const params = {
      not_viewed: props.isNotView || null,
      page: currentPage + 1
    };
    try {
      setLoading(true);
      const { data } = await getListNotification(params);
      setListNotification([...listNotification, ...data.notifications]);
      currentPage = data.paging.page;
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

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
        {isLoading && <LoadingBox />}
      </div>
    </div>
  );
};

export default connect(state => ({}), {
  actionChangeNumNotificationNotView
})(MessageRight);
