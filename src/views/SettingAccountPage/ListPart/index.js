import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  mdiEmailMarkAsUnread,
  mdiBell,
  mdiAccountCircle,
  mdiLock
} from '@mdi/js';
import { Routes } from '../../../constants/routes';
import '../SettingAccount.scss';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const listMenu = [
  {
    title: 'Thông tin tài khoản',
    url: Routes.SETTING_ACCOUNT_INFO,
    icon: mdiAccountCircle
  },
  {
    title: 'Đổi mật khẩu',
    url: Routes.SETTING_ACCOUNT_PASSWORD,
    icon: mdiLock
  },
  {
    title: 'Quản lý ticket',
    url: Routes.SETTING_ACCOUNT_TICKET,
    icon: mdiEmailMarkAsUnread
  },
  {
    title: 'Thông báo của WorkPlus',
    url: Routes.SETTING_ACCOUNT_NOTIFI,
    icon: mdiBell
  }
];

const ListPart = () => {
  return <LeftSetting title="Cài đặt tài khoản" listMenu={listMenu} />;
};

export default ListPart;
