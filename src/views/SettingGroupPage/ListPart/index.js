import React from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import LeftSetting from "../../../components/LeftSetting/LeftSetting";
import { Routes } from "../../../constants/routes";

const ListPart = (props) => {
  const { t } = useTranslation();
  const listMenu = [
    // {
    //   title: t('IDS_WP_SETTING_GROUP'),
    //   url: Routes.SETTING_GROUP_INFO
    //   // icon: mdiAccountMultiple
    // },
    {
      title: t("IDS_WP_SETTING_SOFTWARE"),
      // url: Routes.SETTING_GROUP_SETTING,
      sub: [
        { name: t("IDS_WP_GROUP_INFO"), url: Routes.SETTING_GROUP_INFO },
        { name: t("IDS_WP_HOME"), url: Routes.SETTING_GROUP_HOME },
        {
          name: t("IDS_WP_PERMISSION_GROUP"),
          url: Routes.SETTING_GROUP_GROUP_PERMISSION,
        },
        { name: t("IDS_WP_SYMBOLISM"), url: Routes.SETTING_GROUP_ICON_MANAGER },
        { name: t("IDS_WP_ROLE"), url: Routes.SETTING_GROUP_ROLE_MANAGER },
      ],
      // icon: mdiSettings
    },
    {
      title: t("IDS_WP_ORDER_MANAGE"),
      // url: Routes.SETTING_GROUP_ORDER,
      sub: [
        {
          name: t("IDS_WP_CREATE_ORDER"),
          url: Routes.SETTING_GROUP_CREATE_ORDER,
        },
        { name: t("IDS_WP_ORDER_LIST"), url: Routes.SETTING_GROUP_ORDER },
        { name: t("IDS_WP_PAYMENT_INFO"), url: Routes.SETTING_GROUP_PAYMENT },
      ],
      // icon: mdiCart
    },
    // {
    //   title: 'Thanh toán',
    //   url: Routes.SETTING_GROUP_PAYMENT,
    //   icon: mdiCreditCardOutline
    // }
  ];
  return <LeftSetting title={t("IDS_WP_MANAGE_GROUP")} listMenu={listMenu} />;
};

export default withRouter(ListPart);
