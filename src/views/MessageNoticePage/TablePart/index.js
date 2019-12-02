import React from 'react';
// import { mdiUpload } from "@mdi/js";
import { withRouter } from 'react-router-dom';
import ColorTypo from '../../../components/ColorTypo';
import '../Message.scss';
import MessageRight from './MessageRight';
import { MESSAGE } from '../../../constants/constants';

const TablePart = props => {
  const getContentSettingAccount = () => {
    const type = props.match.params.type;
    switch (type) {
      case MESSAGE.ALL:
        return <MessageRight />;
      case MESSAGE.NEW:
        return <MessageRight />;
      case MESSAGE.NOTICE_ALL:
        return <MessageRight />;
      case MESSAGE.NOTICE_NEW:
        return <MessageRight />;
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
  return (
    <div className="header-setting-container">
      <div className="header-setting">
        <ColorTypo className="header-title">{getHeader()}</ColorTypo>
      </div>
      {getContentSettingAccount()}
    </div>
  );
};

export default withRouter(TablePart);
