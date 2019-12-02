import React from 'react';
import { connect } from 'react-redux';
// import Icon from "@mdi/react";
// import { mdiStar } from "@mdi/js";
import { SETTING_ACCOUNT } from '../../../constants/constant';
import ChangePassword from './ChangePassword';
import NotificationWorkPlus from './NotificationWorkPlus';
import SettingInfo from './SettingInfo';
import TicketManager from './TicketManager';
import HeaderAccount from './HeaderAccount';
import NotificationWorkPlusDetail from './NotificationWorkPlusDetail';
import './SettingAccountRight.scss';

const SettingAccountRight = props => {
  getContentSettingAccountRight = () => {
    switch (props.settingAccountType) {
      case SETTING_ACCOUNT.INFO:
        return <SettingInfo />;
      case SETTING_ACCOUNT.CHANGE_PASSWORD:
        return <ChangePassword />;
      case SETTING_ACCOUNT.TICKET_MANAGER:
        return <TicketManager />;
      case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS:
        return <NotificationWorkPlus />;
      case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS_DETAIL:
        return <NotificationWorkPlusDetail />;
      default:
        return null;
    }
  };

  return (
    <div className="SettingAccountPage">
      <HeaderAccount />
      {getContentSettingAccountRight()}
    </div>
  );
};

export default connect(
  state => ({
    settingAccountType: state.settingReducer.settingAccountType
  }),
  {}
)(SettingAccountRight);
