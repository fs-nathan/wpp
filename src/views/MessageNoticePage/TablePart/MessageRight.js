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
import LoadingBox from '../../../components/LoadingBox';

let currentPage = 1;
const MessageRight = props => {
  const [listMessage, setListMessage] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [page, setPage] = useState({ total_page: 1, page: 1 });

  const fetMessage = async params => {
    try {
      setLoading(true);
      const { data } = await getListMessage(params);
      setListMessage(data.data_chats);
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
    fetMessage(params); // eslint-disable-next-line
  }, []);
  useEffect(() => {
    let params = {};
    if (props.isNotView) {
      params = { not_viewed: true };
    }
    fetMessage(params); // eslint-disable-next-line
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
      const { data } = await getListMessage(params);
      setListMessage([...listMessage, ...data.data_chats]);
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
        {isLoading && <LoadingBox />}
      </div>
    </div>
  );
};

export default connect(state => ({}), { actionChangeNumMessageNotView })(
  MessageRight
);
