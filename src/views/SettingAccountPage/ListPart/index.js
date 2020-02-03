import React, { useState, useEffect } from 'react';
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
      title: 'Tài khoản',
      // icon: mdiAccountCircle,
      sub: [
        { name: 'Thông tin tài khoản', url: Routes.SETTING_ACCOUNT_INFO },
        { name: 'Đổi mật khẩu', url: Routes.SETTING_ACCOUNT_PASSWORD }
      ]
    },
    {
      title: 'Thông báo của WorkPlus',
      url: Routes.SETTING_ACCOUNT_NOTIFI,
      // icon: mdiBell,
      rightIcon: () => GetNotificationTitle(isNotificationNew)
    }
  ];
  return <LeftSetting title="Cài đặt tài khoản" listMenu={listMenu} />;
};

export default ListPart;
