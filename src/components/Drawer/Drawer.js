import Drawer from "@material-ui/core/Drawer";
import React from "react";
import {connect} from "react-redux";
import {actionVisibleDrawerMessage} from "../../actions/system/system";
import {DRAWER_TYPE} from "../../constants/constants";
import {isEmpty} from "../../helpers/utils/isEmpty";
import AddUser from "views/DepartmentPage/LeftPart/AddUser";
import ListProjectKanban from "views/JobDetailPage/ListPart/ListProjectKanban";
import KanbanFilterSlider from "views/KanbanPage/Sliders/FilterSlider";
import KanbanMemberSlider from "views/KanbanPage/Sliders/MemberSlider";
import "./Drawer.scss";
import DrawerMessage from "./DrawerContentComponent/DrawerMessage";
import DrawerNewGroup from "./DrawerContentComponent/DrawerNewGroup";
import DrawerNotification from "./DrawerContentComponent/DrawerNotification";
import DrawerSetting from "./DrawerContentComponent/DrawerSetting";
import DrawerSupport from "./DrawerContentComponent/DrawerSupport";
import DrawerQuickAccess from "./DrawerContentComponent/DrawerQuickAccess.";
import GroupAccountModal from "../GroupAccountModal/GroupAccountModal";

const generateContent = (typeDrawer, optionsDrawer) => {
  switch (typeDrawer) {
    case DRAWER_TYPE.SUPPORT:
      return <DrawerSupport />;
    case DRAWER_TYPE.MESSAGE:
      return <DrawerMessage />;
    case DRAWER_TYPE.NOTIFICATION:
      return <DrawerNotification />;
    case DRAWER_TYPE.SETTING:
      return <DrawerSetting />;
    case DRAWER_TYPE.JOIN_NEW_GROUP:
      return <DrawerNewGroup />;
    case DRAWER_TYPE.ADD_USER:
      return <AddUser />;
    case DRAWER_TYPE.KANBAN.PROJECTS:
      return <ListProjectKanban projectId={optionsDrawer.projectId} />;
    case DRAWER_TYPE.KANBAN.MEMBERS:
      return <KanbanMemberSlider 
        {...optionsDrawer}
      />;
    case DRAWER_TYPE.KANBAN.FILTER:
      return <KanbanFilterSlider 
        {...optionsDrawer}
      />;
    case DRAWER_TYPE.QUICK_ACCESS:
      return <DrawerQuickAccess {...optionsDrawer}/>
    default:
      return "";
  }
};
const DrawerComponent = props => {
  const { typeDrawer, actionVisibleDrawerMessage, anchorDrawer, optionsDrawer } = props;
  const [openAccountModal, setOpenAccountModal] = React.useState(true);

  if(typeDrawer === DRAWER_TYPE.GROUP_ACCOUNT) {
    return <GroupAccountModal open={openAccountModal} setOpen={setOpenAccountModal}/>
  } else {
    return (
      <Drawer
        anchor={anchorDrawer}
        open={!isEmpty(typeDrawer)}
        onClose={() =>
          actionVisibleDrawerMessage({ type: "", anchor: anchorDrawer })
        }
        className={`${typeDrawer === DRAWER_TYPE.QUICK_ACCESS ? "Drawer-Base" : "Drawer-Compenent"} ${
          anchorDrawer === "left"
            ? "anchor-drawer-left"
            : anchorDrawer === "right"
            ? "anchor-drawer-right"
            : "anchor-drawer-top"
        } anchor-drawer-quick-access`}
        transitionDuration={0}
      >
        {generateContent(typeDrawer, optionsDrawer)}
      </Drawer>
    );
  }
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer,
    optionsDrawer: state.system.optionsDrawer,
  }),
  {
    actionVisibleDrawerMessage
  }
)(DrawerComponent);
