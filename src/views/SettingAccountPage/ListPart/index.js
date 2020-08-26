import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { actionGetNotification, getNotificationService } from '../../../actions/account';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';
import { Routes } from '../../../constants/routes';
import { isEmpty } from '../../../helpers/utils/isEmpty';
import '../SettingAccount.scss';

const getContent = value => {
  if (value > 0) {
    return <span className="system-notification-badge">{value > 99 ? '99+' : value}</span>;
  }
  return null;
};
const ListPart = props => {
  const { t } = useTranslation();
  const handleFetchData = async () => {
    try {
      const { data } = await getNotificationService();
      props.actionGetNotification(data.notifications || []);
    } catch (err) { }
  };
  useEffect(() => {
    handleFetchData(); // eslint-disable-next-line
  }, []);
  const listMenu = [
    {
      title: t('IDS_WP_ACCOUNT'),
      // icon: mdiAccountCircle,
      sub: [
        { name: t('IDS_WP_ACCOUNT_INFO'), url: Routes.SETTING_ACCOUNT_INFO },
        {
          name: t('IDS_WP_CHANGE_PASSWORD'),
          url: Routes.SETTING_ACCOUNT_PASSWORD
        }
      ]
    },
    {
      title: t('IDS_WP_COMMON_SETUP'),
      // icon: mdiAccountCircle,
      sub: [
        { name: t('IDS_WP_TIME_LANGUAGE'), url: Routes.SETTING_GROUP_LANGUAGE },
        {
          name: t('IDS_WP_SETUP_NOTICE'),
          url: Routes.SETTING_GROUP_NOTIFICATION
        }
      ]
    },
    {
      title: t('IDS_WP_NOTICE_WORKPLUS'),
      url: Routes.SETTING_ACCOUNT_NOTIFI,
      rightIcon: () =>
        getContent(!isEmpty(props.notification) ? props.notification.length : 0)
    }
  ];
  return <LeftSetting title={t('IDS_WP_SETUP_ACCOUNT')} listMenu={listMenu} />;
};

export default connect(
  state => ({
    notification: state.system.notification
  }),
  { actionGetNotification }
)(ListPart);
