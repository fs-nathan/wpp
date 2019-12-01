import React from 'react';
import '../Message.scss';
import MessageRightItem from './MessageRightItem';

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
const MessageRight = () => {
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

export default MessageRight;
