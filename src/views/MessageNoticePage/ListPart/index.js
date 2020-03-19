import React from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import {
  mdiMessageText,
  mdiBell,
  mdiBellSleep,
  mdiMessageTextOutline
} from '@mdi/js';
import { Routes } from '../../../constants/routes';
import '../Message.scss';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const ListPart = props => {
  const { t } = useTranslation();
  const getContent = value => {
    if (value > 0) {
      return <span className="badge">{value > 99 ? '99+' : value}</span>;
    }
    return null;
  };
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
      rightIcon: () => getContent(props.numberMessageNotView),
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
      rightIcon: () => getContent(props.numberNotificationNotView),
      icon: mdiBellSleep,
      color: '#607d8b'
    }
  ];
  return <LeftSetting title={t('IDS_WP_NOTICE_MESSAGE')} listMenu={listMenu} />;
};

export default connect(
  state => ({
    numberNotificationNotView: state.system.numberNotificationNotView,
    numberMessageNotView: state.system.numberMessageNotView
  }),
  {}
)(ListPart);
