import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
// import { mdiBell, mdiAccountCircle, mdiLock } from '@mdi/js';
import Badge from '@material-ui/core/Badge';
import { Routes } from '../../../constants/routes';
import '../SettingAccount.scss';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';
import { getNotificationStatus } from '../../../actions/account';

const GetNotificationTitle = isNotificationNew => {
  if (isNotificationNew) {
    return (
      <Badge
        badgeContent="N"
        color="error"
        className="bag-cus none-view notification-left-badge"
      ></Badge>
    );
  }
  return null;
};
const ListPart = props => {
  const { t } = useTranslation();
  const [isNotificationNew, setNew] = useState(false);
  const handleFetchData = async () => {
    try {
      const { data } = await getNotificationStatus();
      setNew(data.new_notification);
    } catch (err) {}
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
      title: t('IDS_WP_NOTICE_WORKPLUS'),
      url: Routes.SETTING_ACCOUNT_NOTIFI,
      // icon: mdiBell,
      rightIcon: () => GetNotificationTitle(isNotificationNew)
    }
  ];
  return <LeftSetting title={t('IDS_WP_SETUP_ACCOUNT')} listMenu={listMenu} />;
};

export default ListPart;
