import React from 'react';
import { withRouter } from 'react-router-dom';
import {
  mdiMessageText,
  mdiBell,
  mdiBellSleep,
  mdiMessageTextOutline
} from '@mdi/js';
import { Routes } from '../../../constants/routes';
import '../Message.scss';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const listMenu = [
  {
    title: 'Tất cả tin nhắn',
    url: Routes.MESSAGE_ALL,
    icon: mdiMessageTextOutline
  },
  {
    title: 'Tin nhắn chưa đọc',
    url: Routes.MESSAGE_NEW,
    icon: mdiMessageText
  },
  {
    title: 'Tất cả thông báo',
    url: Routes.NOTICE_ALL,
    icon: mdiBell
  },
  {
    title: 'Thông báo chưa đọc',
    url: Routes.NOTICE_NEW,
    icon: mdiBellSleep
  }
];

const ListPart = () => {
  return <LeftSetting title="Thông báo - Tin nhắn" listMenu={listMenu} />;
};

export default ListPart;
