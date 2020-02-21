import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  mdiMessageText,
  mdiBell,
  mdiBellSleep,
  mdiMessageTextOutline
} from '@mdi/js';
import { Routes } from '../../../constants/routes';
import '../Message.scss';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const ListPart = () => {
  const { t } = useTranslation();
  const listMenu = [
    {
      title: t('IDS_WP_ALL_MESSAGE'),
      url: Routes.MESSAGE_ALL,
      icon: mdiMessageTextOutline,
      color: '#ff9800'
    },
    {
      title: t('IDS_WP_NEW_MESSAGE'),
      url: Routes.MESSAGE_NEW,
      icon: mdiMessageText,
      color: '#ff9800'
    },
    {
      title: t('IDS_WP_ALL_NOTICE'),
      url: Routes.NOTICE_ALL,
      icon: mdiBell,
      color: '#607d8b'
    },
    {
      title: t('IDS_WP_NEW_NOTICE'),
      url: Routes.NOTICE_NEW,
      icon: mdiBellSleep,
      color: '#607d8b'
    }
  ];
  return <LeftSetting title={t('IDS_WP_NOTICE_MESSAGE')} listMenu={listMenu} />;
};

export default ListPart;
