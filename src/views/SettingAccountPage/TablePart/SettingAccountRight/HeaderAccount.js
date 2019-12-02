import React, { Component } from 'react';
import { connect } from 'react-redux';
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import { SETTING_ACCOUNT } from '../../../constants/constant';
import './SettingAccountRight.scss';
import { actionSettingGroup } from '../../../actions/setting';
import SearchIcon from '../../../assets/search-ic.jpg';

const getTitleHeader = groupType => {
  switch (groupType) {
    case SETTING_ACCOUNT.INFO:
      return 'Thông tin tài khoản';
    case SETTING_ACCOUNT.CHANGE_PASSWORD:
      return 'Đổi mật khẩu';
    case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS:
      return 'Thông báo WorkPlus';
    case SETTING_ACCOUNT.NOTIFICATION_WORKPLUS_DETAIL:
      return 'Chi tiết thông báo';
    default:
      return 'Quản lý Ticket';
  }
};
const HeaderAccount = props => {
  const { settingAccountType } = props;
  const openSearchModal = () => {};
  return (
    <div className="SettingAccountHeader MainRight__action d-sm-flex justify-content-between align-items-center">
      <div className="ml-3 mb-2 message-title">
        <Icon path={mdiStar} size={1} color="#31b586" />
        <strong className="ml-2 text-green">
          {getTitleHeader(settingAccountType)}
        </strong>
      </div>
      {settingAccountType === SETTING_ACCOUNT.NOTIFICATION_WORKPLUS && (
        <div className="search ml-4 pt-1 right-header-account">
          <input
            name="search-job"
            type="text"
            className="form-control"
            id="inputSearch"
            onClick={openSearchModal}
            placeholder="Tìm kiếm thông báo"
            style={{ backgroundImage: `url(${SearchIcon})` }}
          />
        </div>
      )}
    </div>
  );
};

export default connect(
  state => ({
    settingAccountType: state.settingReducer.settingAccountType
  }),
  { actionSettingGroup }
)(HeaderAccount);
