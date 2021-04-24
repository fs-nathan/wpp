import get from "lodash/get";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import LeftSetting from "../../../components/LeftSetting/LeftSetting";
import { Routes } from "../../../constants/routes";
import { settingGroupPermission } from "../GroupPermissionSettings/redux";

const premissionAttr = {
  manage_group_permission: "manage_group_permission",
  manage_home_page: "manage_home_page",
  manage_icon: "manage_icon",
  manage_info: "manage_info",
  manage_order: "manage_order",
  manage_role: "manage_role",
};
const ListPart = ({ premissions = emptyObject }) => {
  console.log(premissions)
  const { t } = useTranslation();
  const listMenu = [
    {
      title: t("IDS_WP_SETTING_SOFTWARE"),
      sub: [
        !!get(premissions, premissionAttr.manage_info) && {
          name: t("IDS_WP_GROUP_INFO"),
          url: Routes.SETTING_GROUP_INFO,
        },
        !!get(premissions, premissionAttr.manage_home_page) && {
          name: t("IDS_WP_HOME"),
          url: Routes.SETTING_GROUP_HOME,
        },
        !!get(premissions, premissionAttr.manage_group_permission) && {
          name: t("IDS_WP_PERMISSION_GROUP"),
          url: Routes.SETTING_GROUP_GROUP_PERMISSION,
        },
        !!get(premissions, premissionAttr.manage_icon) && {
          name: t("IDS_WP_SYMBOLISM"),
          url: Routes.SETTING_GROUP_ICON_MANAGER,
        },
        !!get(premissions, premissionAttr.manage_role) && {
          name: t("IDS_WP_ROLE"),
          url: Routes.SETTING_GROUP_ROLE_MANAGER,
        },
        
      ].filter((item) => item && item !== null),
    },
    !!get(premissions, premissionAttr.manage_order) && {
      title: t("IDS_WP_ORDER_MANAGE"),
      sub: [
        {
          name: t("IDS_WP_CREATE_ORDER"),
          url: Routes.SETTING_GROUP_CREATE_ORDER,
        },
        { name: t("IDS_WP_ORDER_LIST"), url: Routes.SETTING_GROUP_ORDER },
        { name: t("IDS_WP_PAYMENT_INFO"), url: Routes.SETTING_GROUP_PAYMENT },
      ],
    },
  ];
  return <LeftSetting title={t("IDS_WP_MANAGE_GROUP")} listMenu={listMenu} />;
};

export default withRouter(
  connect((state) => {
    return {
      premissions: settingGroupPermission.selectors.permissionViewSettingGroupSelector(
        state
      ),
    };
  })(ListPart)
);
