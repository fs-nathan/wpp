import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import '../Message.scss';
import MessageRightItem from './MessageRightItem';
import {
  getNotificationService,
  actionGetNotification
} from '../../../actions/account';

const listMessage = [
  {
    name: 'Công việc số 1',
    description: 'Lập danh sách khách hàng chuyển bộ phận hành chính',
    date: '15:22',
    read: true
  },
  {
    name: 'Công việc số 2',
    description: 'Lập danh sách khách hàng chuyển bộ phận hành chính',
    date: '15:22',
    read: false
  },
  {
    name: 'Công việc số 3',
    description: 'Lập danh sách khách hàng chuyển bộ phận hành chính',
    date: '15:22',
    read: true
  }
];
const MessageRight = props => {
  const handleFetchData = async () => {
    try {
      const { data } = await getNotificationService();
      if (data.data) props.actionGetNotification(data.data);
    } catch (err) {}
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);
  console.log('notification', props.notification);
  return (
    <div className="MessagePage">
      <div className="content-message">
        {listMessage.map((message, index) => (
          <MessageRightItem item={message} key={index} />
        ))}
      </div>
    </div>
  );
};

export default connect(
  state => ({
    notification: state.system.notification
  }),
  { actionGetNotification }
)(MessageRight);
