import React, { Component } from 'react';
import { connect } from 'react-redux';
import Button from '@material-ui/core/Button';
import { mdiAccount, mdiAccountSupervisorCircle, mdiLogout } from '@mdi/js';
import { actionVisibleDrawerMessage } from '../../../actions/system/system';
import HeaderDrawer from '../HeaderDrawer';
import '../Drawer.scss';
import FooterListDrawer from '../FooterListDrawer';
import { Routes } from '../../../constants/routes';

const listSetting = [
  { name: 'Tên tài khoản', value: 'huuthanhxd@gmail.com', read: true },
  { name: 'Mã tài khoản', value: 'ID-1008', read: false },
  { name: 'Gói tài khoản', value: 'FREE', read: false },
  { name: 'Mã đơn hàng', value: '//', read: false },
  { name: 'Tài khoản kết nối', value: '0/0 User', read: false },
  { name: 'Dung lượng lưu trữ', value: '0/0 GB', read: false },
  { name: 'Thời gian sử dụng', value: '0 Ngày', read: false },
  { name: 'Ngày hết hạn', value: '//', read: false }
];
class DrawerSetting extends Component {
  upgradeNow = () => {
    console.log('upgrade now');
  };
  render() {
    // const { actionVisibleDrawerMessage, typeDrawer } = this.props;
    const actionList = [
      {
        name: 'Cài đặt tài khoản',
        icon: mdiAccount,
        url: Routes.SETTING_ACCOUNT_INFO
      },
      {
        name: 'Cài đặt nhóm',
        icon: mdiAccountSupervisorCircle,
        url: Routes.SETTING_GROUP_INFO
      },
      { name: 'Đăng xuất', icon: mdiLogout, url: Routes.LOGIN }
    ];
    return (
      <div className="drawer-content-container">
        <HeaderDrawer title="Thông tin tài khoản" />
        <div className="content-drawer">
          {listSetting.map((item, index) => (
            <div className="item-message setting-item" key={index}>
              <div className="name-setting-message">
                <p className="text-setting-message">{item.name}</p>
                <span className="setting-value-message">{item.value}</span>
              </div>
            </div>
          ))}
          <Button
            variant="outlined"
            className="upgrade-btn"
            onClick={this.upgradeNow}
          >
            Nâng cấp ngay
          </Button>
        </div>
        <FooterListDrawer actionList={actionList} />
      </div>
    );
  }
}

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerSetting);
