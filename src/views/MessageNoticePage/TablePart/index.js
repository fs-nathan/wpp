import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Scrollbars } from 'react-custom-scrollbars';
import { withRouter } from 'react-router-dom';
import ColorTypo from '../../../components/ColorTypo';
import '../Message.scss';
import MessageRight from './MessageRight';
import NotificationRight from './NotificationRight';
import { MESSAGE } from '../../../constants/constants';

const TablePart = props => {
  const { t } = useTranslation();
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
        return t('IDS_WP_ALL_MESSAGE');
      case MESSAGE.NEW:
        return t('IDS_WP_NEW_MESSAGE');
      case MESSAGE.NOTICE_ALL:
        return t('IDS_WP_ALL_NOTICE');
      case MESSAGE.NOTICE_NEW:
        return t('IDS_WP_NEW_NOTICE');
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
