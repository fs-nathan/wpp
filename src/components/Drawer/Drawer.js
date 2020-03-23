import Drawer from "@material-ui/core/Drawer";
import React from "react";
import { connect } from "react-redux";
import { actionVisibleDrawerMessage } from "../../actions/system/system";
import { DRAWER_TYPE } from "../../constants/constants";
import { isEmpty } from "../../helpers/utils/isEmpty";
import AddUser from "../../views/DepartmentPage/LeftPart/AddUser";
import "./Drawer.scss";
import DrawerGroupAcount from "./DrawerContentComponent/DrawerGroupAcount";
import DrawerMessage from "./DrawerContentComponent/DrawerMessage";
import DrawerNewGroup from "./DrawerContentComponent/DrawerNewGroup";
import DrawerNotification from "./DrawerContentComponent/DrawerNotification";
import DrawerSetting from "./DrawerContentComponent/DrawerSetting";
import DrawerSupport from "./DrawerContentComponent/DrawerSupport";

const generateContent = typeDrawer => {
  switch (typeDrawer) {
    case DRAWER_TYPE.SUPPORT:
      return <DrawerSupport />;
    case DRAWER_TYPE.MESSAGE:
      return <DrawerMessage />;
    case DRAWER_TYPE.NOTIFICATION:
      return <DrawerNotification />;
    case DRAWER_TYPE.GROUP_ACCOUNT:
      return <DrawerGroupAcount />;
    case DRAWER_TYPE.SETTING:
      return <DrawerSetting />;
    case DRAWER_TYPE.JOIN_NEW_GROUP:
      return <DrawerNewGroup />;
    case DRAWER_TYPE.ADD_USER:
      return <AddUser />;
    default:
      return "";
  }
};
const DrawerComponent = props => {
  const { typeDrawer, actionVisibleDrawerMessage, anchorDrawer } = props;
  return (
    <Drawer
      anchor={anchorDrawer}
      open={!isEmpty(typeDrawer)}
      onClose={() =>
        actionVisibleDrawerMessage({ type: "", anchor: anchorDrawer })
      }
      className={`Drawer-Compenent ${
        anchorDrawer === "left"
          ? "anchor-drawer-left"
          : anchorDrawer === "right"
          ? "anchor-drawer-right"
          : "anchor-drawer-top"
      }`}
    >
      {generateContent(typeDrawer)}
    </Drawer>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerComponent);
