import React from 'react';
import {connect} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {actionVisibleDrawerMessage} from '../../../actions/system/system';
import HeaderDrawer from '../HeaderDrawer';
import '../Drawer.scss';
import {mdiBookmarkMultipleOutline, mdiClockOutline, mdiClose, mdiDragVertical} from "@mdi/js";
import Icon from "@mdi/react";
import {Scrollbars} from "react-custom-scrollbars";
import {Divider, Link, List, ListItem, ListItemIcon, ListItemText, Typography} from "@material-ui/core";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import {useHistory} from "react-router-dom";
import {get, map} from "lodash";
import {getProjectRecently} from "../../../actions/project/recentlyProjects";
import {getProjectOnPersonalBoard} from "../../../actions/project/projectOnPersonalBoard";
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import {resolvedWorkType} from "../../../helpers/project/commonHelpers";
import {useLocalStorage} from "react-use";
import CreateNewProject from "../../../views/ProjectGroupPage/Modals/CreateNewProject";

const DrawerQuickAccess = props => {
  const { t } = useTranslation();
  const history = useHistory();
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
  }
  function handleCreateNewWorkingBoard() {
    setOpenModal(true);
  }
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
                <PeopleAltOutlinedIcon style={{color: "#D04C01"}}/>
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
                                  <div {...provided.dragHandleProps} className={"quickAccess--groupContent-listCustom-dragIcon"}>
                                    <Icon path={mdiDragVertical} size={1} />
                                  </div>
                                  <ListItemIcon className={"quickAccess--groupContent-iconCustom"}>
                                    <img src={resolvedWorkType(project.work_type)} alt="" width={22} height={22}/>
                                  </ListItemIcon>
                                  <ListItemText primary={project.name} />
                                  <div className={"quickAccess--groupContent-listCustom-closeIcon"}>
                                    <Icon path={mdiClose} size={0.8} color="rgba(0, 0, 0, 0.54)"/>
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
