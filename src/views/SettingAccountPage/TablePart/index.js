import React from 'react';
import { withRouter } from 'react-router-dom';
import { Scrollbars } from 'react-custom-scrollbars';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import ColorTypo from '../../../components/ColorTypo';
import HeaderButtonGroup from './HeaderButtonGroup';
import SettingInfo from '../TablePart/SettingAccountRight/SettingInfo';
import ChangePassword from '../TablePart/SettingAccountRight/ChangePassword';
import TicketManager from '../TablePart/SettingAccountRight/TicketManager';
import NotificationWorkPlus from '../TablePart/SettingAccountRight/NotificationWorkPlus';
import NotificationWorkPlusDetail from '../TablePart/SettingAccountRight/NotificationWorkPlusDetail';
import '../SettingAccount.scss';
import { SETTING_ACCOUNT } from '../../../constants/constants';
import { RightHeader } from '../../DocumentPage/TablePart/DocumentComponent/TableCommon';

const TablePart = props => {
  const type = props.match.params.type;
  const search = props.location.search;
  const isNotiDetail =
    type === SETTING_ACCOUNT.NOTIFICATION_WORKPLUS && !isEmpty(search);

  const getContentSettingAccount = () => {
    switch (type) {
      case SETTING_ACCOUNT.INFO:
        return <SettingInfo />;
      case SETTING_ACCOUNT.CHANGE_PASSWORD:
        return <ChangePassword />;
      case SETTING_ACCOUNT.TICKET_MANAGER:
        return <TicketManager />;
      case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS: {
        if (isEmpty(search)) {
          return <NotificationWorkPlus />;
        }
        return <NotificationWorkPlusDetail />;
      }
      default:
        return <SettingInfo />;
    }
  };
  const getHeader = () => {
    const type = props.match.params.type;
    const search = props.location.search;
    switch (type) {
      case SETTING_ACCOUNT.INFO:
        return 'Thông tin nhóm';
      case SETTING_ACCOUNT.CHANGE_PASSWORD:
        return 'Đổi mật khẩu';
      case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS:
        if (isEmpty(search)) {
          return 'Thông báo của WorkPlus';
        }
        return 'Chi tiết thông báo';
      default:
        return 'Quản lý ticket';
    }
  };
  return (
    <div className="header-setting-container">
      <div className="header-setting">
        <ColorTypo className="header-title">{getHeader()}</ColorTypo>
        {isNotiDetail && (
          <RightHeader>
            <HeaderButtonGroup />
          </RightHeader>
        )}
      </div>
      <div className="setting-right-content">
        <Scrollbars autoHide autoHideTimeout={500}>
          {getContentSettingAccount()}
        </Scrollbars>
      </div>
    </div>
  );
};

export default withRouter(TablePart);
