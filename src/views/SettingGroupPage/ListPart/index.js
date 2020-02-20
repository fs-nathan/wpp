import React from 'react';
import { useTranslation } from 'react-i18next';
import { withRouter } from 'react-router-dom';
import { Routes } from '../../../constants/routes';
import LeftSetting from '../../../components/LeftSetting/LeftSetting';

const ListPart = props => {
  const { t } = useTranslation();
  const listMenu = [
    {
      title: t('IDS_WP_SETTING_GROUP'),
      url: Routes.SETTING_GROUP_INFO
      // icon: mdiAccountMultiple
    },
    {
      title: t('IDS_WP_SETUP_SOFTWARE'),
      // url: Routes.SETTING_GROUP_SETTING,
      sub: [
        { name: t('IDS_WP_TIME_LANGUAGE'), url: Routes.SETTING_GROUP_LANGUAGE },
        {
          name: t('IDS_WP_SETUP_NOTICE'),
          url: Routes.SETTING_GROUP_NOTIFICATION
        }
      ]
      // icon: mdiSettings
    },
    {
      title: t('IDS_WP_ORDER_MANAGE'),
      // url: Routes.SETTING_GROUP_ORDER,
      sub: [
        {
          name: t('IDS_WP_CREATE_ORDER'),
          url: Routes.SETTING_GROUP_CREATE_ORDER
        },
        { name: t('IDS_WP_ORDER_LIST'), url: Routes.SETTING_GROUP_ORDER },
        { name: t('IDS_WP_PAYMENT_INFO'), url: Routes.SETTING_GROUP_PAYMENT }
      ]
      // icon: mdiCart
    }
    // {
    //   title: 'Thanh toán',
    //   url: Routes.SETTING_GROUP_PAYMENT,
    //   icon: mdiCreditCardOutline
    // }
  ];
  return <LeftSetting title={t('IDS_WP_MANAGE_GROUP')} listMenu={listMenu} />;
};

export default withRouter(ListPart);
