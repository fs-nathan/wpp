import React, { useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
import ColorTypo from '../../../components/ColorTypo';
import '../Message.scss';
import MessageRight from './MessageRight';
import NotificationRight from './NotificationRight';
import { MESSAGE } from '../../../constants/constants';

const TablePart = props => {
  const [isLoadMore, setLoadMore] = useState(false);
  const getContentSettingAccount = isLoadMore => {
    const type = props.match.params.type;
    switch (type) {
      case MESSAGE.ALL:
        return <MessageRight isNotView={false} isLoadMore={isLoadMore} />;
      case MESSAGE.NEW:
        return <MessageRight isNotView={true} isLoadMore={isLoadMore} />;
      case MESSAGE.NOTICE_ALL:
        return <NotificationRight isNotView={false} isLoadMore={isLoadMore} />;
      case MESSAGE.NOTICE_NEW:
        return <NotificationRight isNotView={true} isLoadMore={isLoadMore} />;
      default:
        return null;
    }
  };
  const getHeader = () => {
    const type = props.match.params.type;
    switch (type) {
      case MESSAGE.ALL:
        return 'Tất cả tin nhắn';
      case MESSAGE.NEW:
        return 'Tin nhắn chưa đọc';
      case MESSAGE.NOTICE_ALL:
        return 'Tất cả thông báo';
      case MESSAGE.NOTICE_NEW:
        return 'Thông báo chưa đọc';
      default:
        return null;
    }
  };
  const handleScroll = () => {
    const messageContent = document
      .getElementsByClassName('MessagePage')[0]
      .getBoundingClientRect();
    setLoadMore(
      window.innerHeight - messageContent.top + 20 >= messageContent.height
    );
  };
  return (
    <div className="header-setting-container">
      <div className="header-setting">
        <ColorTypo className="header-title">{getHeader()}</ColorTypo>
      </div>
      <div className="setting-right-content">
        <Scrollbars autoHide autoHideTimeout={500} onScroll={handleScroll}>
          {getContentSettingAccount(isLoadMore)}
        </Scrollbars>
      </div>
    </div>
  );
};

export default withRouter(TablePart);
