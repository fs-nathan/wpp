import React from 'react';
import {connect, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {actionVisibleDrawerMessage} from '../../../actions/system/system';
import HeaderDrawer from '../HeaderDrawer';
import '../Drawer.scss';
import {mdiBookmarkMultipleOutline, mdiClockOutline, mdiClose} from "@mdi/js";
import Icon from "@mdi/react";
import {Scrollbars} from "react-custom-scrollbars";
import {Divider, IconButton, Link, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useHistory} from "react-router-dom";
import {get, map, forEach} from "lodash";
import {getProjectRecently} from "../../../actions/project/recentlyProjects";
import {getProjectOnPersonalBoard} from "../../../actions/project/projectOnPersonalBoard";
import {resolvedWorkType} from "../../../helpers/project/commonHelpers";
import {useLocalStorage} from "react-use";
import CreateNewProject from "../../../views/ProjectGroupPage/Modals/CreateNewProject";
import SvgIcon from "@material-ui/core/SvgIcon";
import {
  CustomEventDispose,
  CustomEventEmitterWithParams,
  CustomEventListener,
  UPDATE_PIN_BOARD_SETTING
} from "../../../constants/events";
import {updatePinBoardSetting} from "../../../actions/project/setting/updatePinBoardSetting";

const DrawerQuickAccess = props => {
  const { t } = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    actionVisibleDrawerMessage, anchorDrawer, getProjectRecently, recentlyProjects,
    getProjectOnPersonalBoard, onBoardProjects
  } = props;
  const [isHideStartButton, setIsHideStartButton] = useLocalStorage(
    "WPS_HIDE_WORKING_START_BUTTON", false
  );
  const [openModal, setOpenModal] = React.useState(false);

  const closeDrawer = () => {
    actionVisibleDrawerMessage({ type: '', anchor: anchorDrawer });
  }
  React.useEffect(() => {
    getProjectRecently();
    getProjectOnPersonalBoard();
  }, [getProjectRecently, getProjectOnPersonalBoard]);
  const handleUnPinBoard = () => {
    setIsHideStartButton(!isHideStartButton);
    CustomEventEmitterWithParams("WPS_HIDE_WORKING_START_BUTTON", {detail: {isHide: !isHideStartButton}});
  }
  function handleCreateNewWorkingBoard() {
    setOpenModal(true);
  }
  function handleDelete(e, projectID) {
    e.stopPropagation();
    let _projects = [];
    forEach(onBoardProjects, function (item) {
      if(item.id !== projectID) _projects.push(item.id);
    })
    dispatch(updatePinBoardSetting({projectId: _projects}));
  }
  React.useEffect(() => {
    const doReload = () => {
      getProjectOnPersonalBoard();
    }
    CustomEventListener(UPDATE_PIN_BOARD_SETTING.SUCCESS, doReload);
    return () => {
      CustomEventDispose(UPDATE_PIN_BOARD_SETTING.SUCCESS, doReload);
    }
  });
  return (
    <>
      <div className="drawer-content">
        <HeaderDrawer title={
          <div className={"header--withIcon"}>
            <Icon path={mdiBookmarkMultipleOutline} size={1} color="rgba(0, 0, 0, 0.54)"/>
            <span className={"text-header"}>{t("LABEL_QUICK_ACCESS_PANEL")}</span>
          </div>
        } />
        <div className="content-drawer">
          <Scrollbars autoHide autoHideTimeout={500}>
            <div style={{padding: "0 18px"}}>
              <div className={"quickAccess--groupContent"}>
                <div className={"quickAccess--groupContent-header"}>
                  <Icon path={mdiClockOutline} size={1.2} color="rgba(0, 0, 0, 0.54)"/>
                  <Typography component="h4">{t("IDS_WP_RECENT")}</Typography>
                </div>
                <div className={"quickAccess--groupContent-body"}>
                  <List component="nav" aria-label="main" className={"quickAccess--groupContent-listCustom"}>
                    {map(recentlyProjects, function (project) {
                      return (
                        <ListItem
                          id={project.id}
                          className={"quickAccess--groupContent-itemCustom"}
                          onClick={() => {
                            closeDrawer();
                            history.replace(project.url_redirect);
                          }}
                        >
                          <ListItemIcon className={"quickAccess--groupContent-iconCustom"}>
                            <img src={resolvedWorkType(project.work_type)} alt="" width={22} height={22}/>
                          </ListItemIcon>
                          <ListItemText primary={project.name} />
                        </ListItem>
                      );
                    })}
                  </List>
                </div>
              </div>
              <Divider/>
              <div className={"quickAccess--groupContent"}>
                <div className={"quickAccess--groupContent-header"}>
                  <SvgIcon htmlColor={"#DB7B48"}>
                    <path d="M6,13c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S8.2,13,6,13z M12,3C9.8,3,8,4.8,8,7s1.8,4,4,4s4-1.8,4-4S14.2,3,12,3z M18,13 c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S20.2,13,18,13z"/>
                  </SvgIcon>
                  <Typography component="h4">{t("LABEL_PERSONAL_BOARD")}</Typography>
                  <div className={"quickAccess--groupContent-header__controlLeft"}>
                    <Link component={"button"} onClick={() => {
                      closeDrawer();
                      history.push(`/projects/personal-board`);
                    }}>{t("LABEL_SEE_ALL")}</Link>
                  </div>
                </div>
                <div className={"textSecondary"}>{t("PROJECT_SETTING_MODAL_PANEL_PIN_DESCRIPTION2")}</div>
                <List component={"nav"} className={"quickAccess--groupContent-listCustom"}>
                  <DragDropContext onDragEnd={() => null}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          style={{marginLeft: 10}}
                        >
                          {map(onBoardProjects, function (project, key) {
                            return (
                              <Draggable key={key} draggableId={get(project, "id")} index={key}>
                                {(provided, snapshot) => (
                                  <ListItem
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={"quickAccess--groupContent-itemCustom"}
                                    onClick={() => {
                                      history.push(project.url_redirect);
                                      closeDrawer();
                                    }}
                                  >
                                    <ListItemIcon className={"quickAccess--groupContent-iconCustom"}>
                                      <img src={resolvedWorkType(project.work_type)} alt="" width={22} height={22}/>
                                    </ListItemIcon>
                                    <ListItemText primary={project.name} />
                                    <div className={"quickAccess--groupContent-listCustom-closeIcon"}>
                                      <IconButton size={"small"} onClick={(e) => handleDelete(e, get(project, "id"))}>
                                        <Icon path={mdiClose} size={0.8} color="rgba(0, 0, 0, 0.54)"/>
                                      </IconButton>
                                    </div>
                                  </ListItem>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </List>
              </div>
              <div className={"quickAccess--bottomLink"}>
                <Link onClick={() => handleUnPinBoard()}>{
                  isHideStartButton ? t("LABEL_VISIBLE_PERSONAL_BOARD_FROM_WORK_CATEGORY") : t("LABEL_HIDE_PERSONAL_BOARD_FROM_WORK_CATEGORY")
                }</Link>
                <Link onClick={() => handleCreateNewWorkingBoard()}>{t("LABEL_CREATE_WORK_TOPIC_PROJECT_PROCESS")}</Link>
              </div>
            </div>
          </Scrollbars>
        </div>
      </div>
      <CreateNewProject open={openModal} setOpen={setOpenModal}/>
    </>
  );
};

export default connect(
  state => ({
    typeDrawer: state.system.typeDrawer,
    anchorDrawer: state.system.anchorDrawer,
    colors: state.setting.colors,
    recentlyProjects: state.project.recentlyProjects.projects,
    onBoardProjects: state.project.getProjectOnPersonalBoard.projects
  }),
  {actionVisibleDrawerMessage, getProjectRecently, getProjectOnPersonalBoard}
)(DrawerQuickAccess);
