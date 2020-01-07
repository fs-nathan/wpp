import React from 'react';
import { withRouter } from 'react-router-dom';
// import {
//   mdiCart,
//   mdiCreditCardOutline,
//   mdiAccountMultiple,
//   mdiSettings
// } from '@mdi/js';
import { Routes } from '../../../constants/routes';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const ListPart = props => {
  const listMenu = [
    {
      title: 'Thiết lập nhóm',
      url: Routes.SETTING_GROUP_INFO
      // icon: mdiAccountMultiple
    },
    {
      title: 'Cài đặt phần mềm',
      // url: Routes.SETTING_GROUP_SETTING,
      sub: [
        { name: 'Thời gian và ngôn ngữ', url: Routes.SETTING_GROUP_LANGUAGE },
        { name: 'Cài đặt thông báo', url: Routes.SETTING_GROUP_NOTIFICATION }
      ]
      // icon: mdiSettings
    },
    {
      title: 'Quản lý đơn hàng',
      // url: Routes.SETTING_GROUP_ORDER,
      sub: [
        {
          name: 'Tạo đơn hàng',
          url: Routes.SETTING_GROUP_CREATE_ORDER
        },
        { name: 'Danh sách đơn hàng', url: Routes.SETTING_GROUP_ORDER },
        { name: 'Thông tin thanh toán', url: Routes.SETTING_GROUP_PAYMENT }
      ]
      // icon: mdiCart
    }
    // {
    //   title: 'Thanh toán',
    //   url: Routes.SETTING_GROUP_PAYMENT,
    //   icon: mdiCreditCardOutline
    // }
  ];
  return <LeftSetting title="Quản lý nhóm" listMenu={listMenu} />;
};

export default withRouter(ListPart);
