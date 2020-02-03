import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import '../Message.scss';
import MessageRightItem from './MessageRightItem';
import {
  getListMessage,
  actionViewMessage
} from '../../../components/Drawer/DrawerService';
import {
  getNumberMessageNotViewer,
  actionChangeNumMessageNotView
} from '../../../actions/system/system';

const MessageRight = props => {
  const [listMessage, setListMessage] = useState([]);
  const fetMessage = async params => {
    try {
      const { data } = await getListMessage(params);
      setListMessage(data.data_chats);
    } catch (error) {}
  };
  useEffect(() => {
    let params = {};
    if (props.isNotView) {
      params = { not_viewed: true };
    }
    fetMessage(params); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    let params = {};
    if (props.isNotView) {
      params = { not_viewed: true };
    }
    fetMessage(params); // eslint-disable-next-line
  }, [props.isNotView]);
  const handleViewNotification = async message => {
    let params = {};
    if (props.isNotView) {
      params = { not_viewed: true };
    }
    if (props.isNotView) {
      await actionViewMessage({
        task_id: message.task_id
      });
      fetMessage(params);
      fetNumberMessageNotViewer();
    }
  };
  const fetNumberMessageNotViewer = async () => {
    try {
      const { data } = await getNumberMessageNotViewer();
      props.actionChangeNumMessageNotView(data.number_chat);
    } catch (error) {}
  };
  return (
    <div className="MessagePage">
      <div className="content-message">
        {listMessage.map((message, index) => (
          <MessageRightItem
            item={message}
            key={index}
            handleViewNotification={() => handleViewNotification(message)}
          />
        ))}
      </div>
    </div>
  );
};

export default connect(state => ({}), { actionChangeNumMessageNotView })(
  MessageRight
);
