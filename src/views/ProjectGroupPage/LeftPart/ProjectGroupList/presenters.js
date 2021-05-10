import {
  Box,
  Button,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography
} from '@material-ui/core';
import {mdiBookmarkOutline, mdiDotsVertical, mdiDragVertical, mdiPlayCircleOutline, mdiPlus} from '@mdi/js';
import Icon from '@mdi/react';
import {get, size} from 'lodash';
import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import SearchInput from '../../../../components/SearchInput';
import './style.scss';
import styled from "styled-components";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import {Scrollbars} from "react-custom-scrollbars";
import CustomAvatar from "../../../../components/CustomAvatar";
import {useHistory} from "react-router-dom";
import {useLocalStorage} from "react-use";
import CreateProjectGroup from "../../Modals/CreateProjectGroup";
import AddToPersonalBoardModal from "../../Modals/AddPersonalBoard";
import FlagOutlinedIcon from '@material-ui/icons/FlagOutlined';
import ProjectGroupDelete from "../../Modals/DeleteProjectGroup";
import {SNACKBAR_VARIANT, SnackbarEmitter} from "../../../../constants/snackbarController";
import {useSelector} from "react-redux";
import SvgIcon from '@material-ui/core/SvgIcon';
import {CustomEventDispose, CustomEventListener} from "../../../../constants/events";

const Banner = ({className = '', ...props}) =>
  <div
    className={`view_ProjectGroup_List___banner ${className}`}
    {...props}
  />;

const LeftContainer = styled.div`
  background: #F1F2F4;
  height: 100vh;
`;

function ProjectList({
  groups, route, canModify,
  searchPattern, setSearchPattern,
  handleSortProjectGroup, handleOpenModal,
}) {
  const history = useHistory();
  const {t} = useTranslation();
  const [isHideStartButton, setIsHideStartButton] = useLocalStorage("WPS_HIDE_WORKING_START_BUTTON", false);
  const [hideBtnState, setHideBtnState] = React.useState(isHideStartButton);
  const [defaultAccessItem, setDefaultAccessItem] = useLocalStorage("WPS_WORKING_SPACE_DEFAULT_ACCESS");
  const [anchorElStartButton, setAnchorElStartButton] = React.useState(null);
  const [anchorElAddGroup, setAnchorElAddGroup] = React.useState(null);
  const [anchorElAddBoard, setAnchorElAddBoard] = React.useState(null);
  const [anchorElGroup, setAnchorElGroup] = React.useState(null);
  const [openCreateGroup, setOpenCreateGroup] = React.useState(false);
  const [openModalPersonalBoard, setOpenModalPersonalBoard] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [alertConfirm, showAlertConfirm] = React.useState(false);
  const isHasProjectRecently = useSelector(state => state.project.checkHasRecently.hasRecently);
  const params = new URLSearchParams(window.location.search);
  const groupID = params.get('groupID');
  const personalProjectsBoard = useSelector(state => state.project.countPersonalProjectsBoard.projects);
  console.log(personalProjectsBoard);
  function onDragEnd(result) {
    const {source, destination, draggableId} = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    handleSortProjectGroup(draggableId, destination.index);
  }

  function handleHideStartBtn(evt) {
    evt.stopPropagation();
    setAnchorElStartButton(null);
    localStorage.setItem("WPS_HIDE_WORKING_START_BUTTON", true);
    setHideBtnState(true);
    if(history.location.pathname === "/projects/start") {
      history.push("/projects/recently");
    }
  }

  function handleSetDefault(value) {
    setDefaultAccessItem(value);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, t("SNACK_MUTATE_SUCCESS"));
  }

  function handleDeleteGroup(evt) {
    evt.stopPropagation();
    showAlertConfirm(true);
    setAnchorElGroup(null);
  }
  React.useEffect(() => {
    CustomEventListener('WPS_HIDE_WORKING_START_BUTTON', (e) => {
      setHideBtnState(e.detail.isHide);
    });
    CustomEventDispose('WPS_HIDE_WORKING_START_BUTTON', (e) => {
      setHideBtnState(e.detail.isHide);
    });
  }, []);
  return (
    <>
      <LeftContainer>
        <Banner>
          <SearchInput
            fullWidth
            placeholder={t("DMH.VIEW.PGP.LEFT.LIST.FIND")}
            value={searchPattern}
            onChange={evt => setSearchPattern(evt.target.value)}
            style={{background: "#fff"}}
          />
        </Banner>
        <Box className={"view_ProjectGroup_List--LeftContainer"}>
          {!Boolean(hideBtnState) && (
            <Box
              className={`view_ProjectGroup_List--startButton ${history.location.pathname.includes("/projects/start") && "active"}`}
              onClick={() => history.push("/projects/start")}
            >
              <Icon path={mdiPlayCircleOutline} size={1} color={"#BD3ADA"}/>
              <span>{t("LABEL_CHAT_TASK_BAT_DAU_LABEL")}</span>
              <IconButton
                className={"rightIconControlList"} size={"small"}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setAnchorElStartButton(evt.currentTarget);
                }}
              >
                <Icon path={mdiDotsVertical} size={1} color={"rgba(0,0,0,0.54)"}/>
              </IconButton>
              <Popover
                open={Boolean(anchorElStartButton)}
                anchorEl={anchorElStartButton}
                disableRestoreFocus
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                onClose={() => setAnchorElStartButton(null)}
                elevation={1}
              >
                <Box className={"startBtnSetting-container"}>
                  <span className={"text-primary"}>{t("LABEL_HIDE_START")}</span>
                  <Typography component={"body2"} color={"textSecondary"}>
                    {t("LABEL_HIDE_START_DES")}
                  </Typography>
                  <Button className={"hideBtn"} onClick={handleHideStartBtn}>{t("IDS_WP_HIDE")}</Button>
                </Box>
              </Popover>
            </Box>
          )}
          <Box className={"view_ProjectGroup_List--listGroup"}>
            <Box className={"view_ProjectGroup_List--listGroup-header textHeader"}>
              <Icon path={mdiBookmarkOutline} size={1} color={"#009CF3"}/>
              <span>{t("LABEL_QUICK_ACCESS_PANEL")}</span>
            </Box>
            <Box className={"view_ProjectGroup_List--listGroup-body"}>
              <List component={"nav"}>
                {isHasProjectRecently && (<ListItem
                  className={`view_ProjectGroup_List-customListItem ${history.location.pathname.includes("/projects/recently") && "active"}`}
                  onClick={() => history.push("/projects/recently")}
                >
                  <ListItemIcon>
                    <AccessTimeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={t("LABEL_SEE_RECENTLY")}/>
                </ListItem>)}
                <ListItem
                  className={`view_ProjectGroup_List-customListItem ${history.location.pathname.includes("/projects/personal-board") && "active"}`}
                  onClick={() => history.push("/projects/personal-board")}
                >
                  <ListItemIcon>
                    <SvgIcon style={{fontSize: "22px"}}>
                      <path d="M0 0h24v24H0z" fill="none"/>
                      <path d="M12 11c1.33 0 4 .67 4 2v.16c-.97 1.12-2.4 1.84-4 1.84s-3.03-.72-4-1.84V13c0-1.33 2.67-2 4-2zm0-1c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm6 .2C18 6.57 15.35 4 12 4s-6 2.57-6 6.2c0 2.34 1.95 5.44 6 9.14 4.05-3.7 6-6.8 6-9.14zM12 2c4.2 0 8 3.22 8 8.2 0 3.32-2.67 7.25-8 11.8-5.33-4.55-8-8.48-8-11.8C4 5.22 7.8 2 12 2z"/>
                    </SvgIcon>
                  </ListItemIcon>
                  <ListItemText primary={`${t("LABEL_PERSONAL_BOARD")} (${size(personalProjectsBoard)})`}/>
                  {defaultAccessItem === "/personal-board" && (
                    <FlagOutlinedIcon color={"disabled"} style={{marginLeft: 10, color: "red"}}/>
                  )}
                  <IconButton
                    className={"rightIconControlList"} size={"small"}
                    onClick={(evt) => {
                      evt.stopPropagation();
                      setAnchorElAddBoard(evt.currentTarget);
                    }}
                  >
                    <Icon path={mdiDotsVertical} size={1} color={"rgba(0,0,0,0.54)"}/>
                  </IconButton>
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box className={"view_ProjectGroup_List--listGroup"}>
            <Box
              className={`view_ProjectGroup_List--listGroup-header ${history.location.pathname === "/projects" && "active"}`}
              onClick={() => history.push("/projects")}
            >
              <SvgIcon htmlColor={"#DB7B48"}>
                <path d="M6,13c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S8.2,13,6,13z M12,3C9.8,3,8,4.8,8,7s1.8,4,4,4s4-1.8,4-4S14.2,3,12,3z M18,13 c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S20.2,13,18,13z"/>
              </SvgIcon>
              <span>{t("LABEL_WORKING_GROUP")}</span>
              <abbr title={t("Thêm nhóm")}>
                <IconButton
                  size={"small"}
                  onClick={(evt) => {
                    evt.stopPropagation();
                    setAnchorElAddGroup(evt.currentTarget);
                  }}
                >
                  <Icon path={mdiPlus} size={1} color={"rgba(0,0,0,0.54)"}/>
                </IconButton>
              </abbr>
            </Box>
            <Box className={"view_ProjectGroup_List--listGroup-body scrollList"}>
              <Scrollbars autoHide autoHideTimeout={500}>
                <List component={"nav"} className={""}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                          {groups.groups.map((projectGroup, index) => (
                            <Draggable key={index} draggableId={get(projectGroup, "id")} index={index}>
                              {(provided, snapshot) => (
                                <ListItem
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  className={`view_ProjectGroup_List-customListItem ${groupID === projectGroup.id && "active"}`}
                                  onClick={() => history.push(`/projects?groupID=${projectGroup.id}`)}
                                >
                                  <div
                                    {...provided.dragHandleProps}
                                    className={"view_ProjectGroup_List-customListItem-dragIcon"}
                                  >
                                    <Icon path={mdiDragVertical} size={1}/>
                                  </div>
                                  <ListItemIcon>
                                    <CustomAvatar
                                      style={{marginRight: "10px", width: 25, height: 25}}
                                      src={get(projectGroup, 'icon')}
                                      alt='avatar'
                                    />
                                  </ListItemIcon>
                                  <ListItemText
                                    primary={<div className={"view_ProjectGroup_List-customListItem__textPrimary"}>
                                      <abbr title={get(projectGroup, "name")}>
                                        {get(projectGroup, "name")}
                                      </abbr>
                                      <div>({projectGroup.number_project})</div>
                                    </div>}/>
                                  {defaultAccessItem === `?groupID=${projectGroup.id}` && (
                                    <FlagOutlinedIcon htmlColor={"red"}/>
                                  )}
                                  <IconButton
                                    className={"rightIconControlList"} size={"small"}
                                    onClick={(evt) => {
                                      evt.stopPropagation();
                                      setAnchorElGroup(evt.currentTarget);
                                      setSelectedGroup(projectGroup);
                                    }}
                                  >
                                    <Icon path={mdiDotsVertical} size={1} color={"rgba(0,0,0,0.54)"}/>
                                  </IconButton>
                                </ListItem>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </List>
              </Scrollbars>
            </Box>
          </Box>
        </Box>
      </LeftContainer>
      <CreateProjectGroup open={openCreateGroup} setOpen={setOpenCreateGroup} updatedProjectGroup={selectedGroup}/>
      <AddToPersonalBoardModal open={openModalPersonalBoard} setOpen={setOpenModalPersonalBoard}/>
      <Popover
        open={Boolean(anchorElAddGroup)}
        anchorEl={anchorElAddGroup}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={() => setAnchorElAddGroup(null)}
        elevation={1}
      >
        <Box className={"addWorkingGroupPopover-container"}>
          <span className={"text-primary"}>{t("LABEL_WORKING_GROUP")}</span>
          <Typography component={"body2"} color={"textSecondary"}>
            {t("LABEL_CREATE_WORKING_GROUP_POPOVER")}
          </Typography>
          <Button
            color="primary" className={"btnAddGroup"}
            onClick={(evt) => {
              evt.stopPropagation();
              setOpenCreateGroup(true);
              setAnchorElAddGroup(null);
              setSelectedGroup(null);
            }}
          >{t("Thêm nhóm")}</Button>
        </Box>
      </Popover>
      <Popover
        open={Boolean(anchorElGroup)}
        anchorEl={anchorElGroup}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={(evt) => {
          evt.stopPropagation();
          setAnchorElGroup(null);
        }}
        elevation={0}
      >
        <Box className={"personalBoard-container"}>
          <Box className={"personalBoard-actionItemWrapper"}>
            <span className={"title"}>{t("LABEL_SET_DEFAULT")}</span>
            <Box className={"actionItem"}>
              <Typography variant={"body2"} color={"textSecondary"}>{t("LABEL_SET_DEFAULT_DES")}</Typography>
              <Button color={"primary"} onClick={(evt) => {
                evt.stopPropagation();
                setAnchorElGroup(null);
                handleSetDefault(`?groupID=${selectedGroup.id}`);
              }}>
                {t("LABEL_SET")}
              </Button>
            </Box>
          </Box>
        </Box>
        {canModify && (
          <>
            <Divider/>
            <MenuList>
              <MenuItem onClick={(evt) => {
                evt.stopPropagation();
                setAnchorElGroup(null);
                setSelectedGroup(selectedGroup);
                setOpenCreateGroup(true);
              }}>{t("IDS_WP_EDIT_TEXT")}
              </MenuItem>
              <MenuItem onClick={evt => handleDeleteGroup(evt)}>
                {t("IDS_WP_DELETE")}
              </MenuItem>
            </MenuList>
          </>
        )}
      </Popover>
      <Popover
        open={Boolean(anchorElAddBoard)}
        anchorEl={anchorElAddBoard}
        disableRestoreFocus
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={(evt) => {
          evt.stopPropagation();
          setAnchorElAddBoard(null);
        }}
        elevation={1}
      >
        <Box className={"personalBoard-container"}>
          <Box className={"personalBoard-actionItemWrapper"}>
            <span className={"title"}>{t("LABEL_ADD_TABLE")}</span>
            <Box className={"actionItem"}>
              <Typography variant={"body2"} color={"textSecondary"}>{t("LABEL_ADD_TABLE_DES")}</Typography>
              <Button color={"primary"} onClick={(evt) => {
                evt.stopPropagation();
                setOpenModalPersonalBoard(true);
                setAnchorElAddBoard(null);
              }}>
                {t("IDS_WP_COMMON_ADD")}
              </Button>
            </Box>
          </Box>
          <Box className={"personalBoard-actionItemWrapper"}>
            <span
              className={"title"}>
              {t("LABEL_SET_DEFAULT")}
            </span>
            <Box className={"actionItem"}>
              <Typography variant={"body2"} color={"textSecondary"}>{t("LABEL_SET_DEFAULT_DES")}</Typography>
              <Button color={"primary"} onClick={(evt) => {
                evt.stopPropagation();
                setAnchorElAddBoard(null);
                handleSetDefault("/personal-board");
              }}>
                {t("LABEL_SET")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
      <ProjectGroupDelete
        selectedProjectGroup={selectedGroup} open={alertConfirm} setOpen={showAlertConfirm}
        redirectURL={"/projects/recently"}
      />
    </>
  )
}

export default ProjectList;
