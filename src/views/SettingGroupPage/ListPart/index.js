import React from 'react';
import {
  mdiCart,
  mdiCreditCardOutline,
  mdiAccountMultiple,
  mdiSettings
} from '@mdi/js';
import { Routes } from '../../../constants/routes';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const listMenu = [
  {
    title: 'Thông tin nhóm',
    url: Routes.SETTING_GROUP_INFO,
    icon: mdiAccountMultiple
  },
  {
    title: 'Cài đặt',
    url: Routes.SETTING_GROUP_SETTING,
    icon: mdiSettings
  },
  {
    title: 'Đơn hàng',
    url: Routes.SETTING_GROUP_ORDER,
    icon: mdiCart
  },
  {
    title: 'Thanh toán',
    url: Routes.SETTING_GROUP_PAYMENT,
    icon: mdiCreditCardOutline
  }
];
const ListPart = () => {
  return <LeftSetting title="Cài đặt nhóm" listMenu={listMenu} />;
};

export default ListPart;
