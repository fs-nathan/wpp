import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { withRouter } from "react-router-dom";
import ColorTypo from "../../../components/ColorTypo";
import { SETTING_GROUP } from "../../../constants/constants";
import { Routes } from "../../../constants/routes";
import { isEmpty } from "../../../helpers/utils/isEmpty";
import {
  RightHeader,
  StyledButton,
} from "../../DocumentPage/TablePart/DocumentComponent/TableCommon";
import TasksScrollbar from "../GroupPermissionSettings/components/TasksScrollbar";
import CreateOrder from "../TablePart/SettingGroupRight/CreateOrder";
import Info from "../TablePart/SettingGroupRight/Info";
import Order from "../TablePart/SettingGroupRight/Order";
import OrderDetail from "../TablePart/SettingGroupRight/OrderDetail";
import Payment from "../TablePart/SettingGroupRight/Payment";
import SetUp from "../TablePart/SettingGroupRight/SetUp";
import HeaderButtonGroup from "./HeaderButtonGroup";
import AccountInternal from "./SettingGroupRight/AccountInternal";
import Home from "./SettingGroupRight/Home/index";
import IconManager from "./SettingGroupRight/IconManager";
import RoleManager from "./SettingGroupRight/RoleManager";

const getHeaderText = (type, search, t) => {
  const isOder = isEmpty(search);
  switch (type) {
    case SETTING_GROUP.INFO:
      return t("IDS_WP_SETTING_GROUP");
    case SETTING_GROUP.HOME:
      return t("IDS_WP_SETTING_HOME");
    case SETTING_GROUP.SETTING:
    case SETTING_GROUP.LANGUAGE:
      return t("IDS_WP_SETUP_SOFTWARE");
    case SETTING_GROUP.NOTIFICATION:
      return t("IDS_WP_SETTING_NOTI");
    case SETTING_GROUP.ORDER: {
      if (isOder) return t("IDS_WP_ORDER");
      return t("IDS_WP_ORDER_DETAIL");
    }
    case SETTING_GROUP.PAYMENT:
      return t("IDS_WP_PAYMENT");
    case SETTING_GROUP.CREATE_ORDER:
      return t("IDS_WP_CREATE_ORDER");
    case SETTING_GROUP.ICON_MANAGER:
      return t("Thiết lập biểu tượng");
    case SETTING_GROUP.ROLE_MANAGER:
      return t("Thiết lập vai trò");
    default:
      return null;
  }
};
const TablePart = (props) => {
  const [hackHeader, setHackHeader] = useState();
  const { t } = useTranslation();
  const type = props.match.params.type;
  const isOder = isEmpty(props.location.search);
  const getContentSettingAccount = () => {
    switch (type) {
      case SETTING_GROUP.INFO:
        return <Info />;
      case SETTING_GROUP.SETTING:
        return <SetUp />;
      case SETTING_GROUP.ORDER: {
        if (isOder) return <Order />;
        return <OrderDetail />;
      }
      case SETTING_GROUP.ACCOUNT_INTERNAL: {
        return <AccountInternal />;
      }
      case SETTING_GROUP.CREATE_ORDER:
        return <CreateOrder />;

      case SETTING_GROUP.PAYMENT:
        return <Payment />;
      case SETTING_GROUP.HOME:
        return <Home />;
      case SETTING_GROUP.ICON_MANAGER:
        return <IconManager />;
      case SETTING_GROUP.ROLE_MANAGER:
        return <RoleManager setHackHeader={setHackHeader} />;
      default:
        return null;
    }
  };
  const checkShowBtnCreateOder = () => {
    return (
      type === SETTING_GROUP.PAYMENT || (type === SETTING_GROUP.ORDER && isOder)
    );
  };
  const checkShowBtnCancelOder = () => {
    return type === SETTING_GROUP.CREATE_ORDER;
  };
  return (
    <div className="header-setting-container">
      {hackHeader || (
        <div className="header-setting">
          <ColorTypo className="header-title">
            {getHeaderText(props.match.params.type, props.location.search, t)}
          </ColorTypo>
          <RightHeader>
            <div
            // className={`${checkShowBtnCreateOder() ? '' : 'none-create-order'}`}
            >
              <HeaderButtonGroup />
            </div>

            {checkShowBtnCreateOder() && (
              <StyledButton
                size="small"
                onClick={() =>
                  props.history.push({
                    pathname: Routes.SETTING_GROUP_CREATE_ORDER,
                  })
                }
              >
                + {t("IDS_WP_CREATE_ORDER")}
              </StyledButton>
            )}
            {checkShowBtnCancelOder() && (
              <StyledButton
                size="small"
                onClick={() =>
                  props.history.push({
                    pathname: Routes.SETTING_GROUP_ORDER,
                  })
                }
              >
                {t("IDS_WP_CANCEL")}
              </StyledButton>
            )}
          </RightHeader>
        </div>
      )}
      <div className="setting-right-content">
        <TasksScrollbar>{getContentSettingAccount()}</TasksScrollbar>
      </div>
    </div>
  );
};

export default withRouter(TablePart);
