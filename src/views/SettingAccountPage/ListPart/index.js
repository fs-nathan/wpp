import React from 'react';
// import { mdiBell, mdiAccountCircle, mdiLock } from '@mdi/js';
import { Routes } from '../../../constants/routes';
import '../SettingAccount.scss';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const listMenu = [
  {
    title: 'Tài khoản',
    // icon: mdiAccountCircle,
    sub: [
      { name: 'Thông tin tài khoản', url: Routes.SETTING_ACCOUNT_INFO },
      { name: 'Đổi mật khẩu', url: Routes.SETTING_ACCOUNT_PASSWORD }
    ]
  },
  {
    title: 'Thông báo của WorkPlus',
    url: Routes.SETTING_ACCOUNT_NOTIFI
    // icon: mdiBell
  }
];

const ListPart = () => {
  return <LeftSetting title="Cài đặt tài khoản" listMenu={listMenu} />;
};

export default ListPart;
