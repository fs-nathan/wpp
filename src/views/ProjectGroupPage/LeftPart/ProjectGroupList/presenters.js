import {
  Box,
  Button, Divider,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Popover,
  Typography,
  MenuList,
  MenuItem
} from '@material-ui/core';
import {mdiBookmarkOutline, mdiDotsVertical, mdiDragVertical, mdiPlayCircleOutline, mdiPlus} from '@mdi/js';
import Icon from '@mdi/react';
import {get} from 'lodash';
import React from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {useTranslation} from 'react-i18next';
import SearchInput from '../../../../components/SearchInput';
import './style.scss';
import styled from "styled-components";
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import PersonPinCircleOutlinedIcon from '@material-ui/icons/PersonPinCircleOutlined';
import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
import {Scrollbars} from "react-custom-scrollbars";
import CustomAvatar from "../../../../components/CustomAvatar";
import {useHistory} from "react-router-dom";
import {useLocalStorage} from "react-use";
import CreateProjectGroup from "../../Modals/CreateProjectGroup";
import AddToPersonalBoardModal from "../../Modals/AddPersonalBoard";

const Banner = ({ className = '', ...props }) =>
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
  const { t } = useTranslation();
  const [isHideStartButton, setIsHideStartButton] = useLocalStorage(
    "WPS_HIDE_WORKING_START_BUTTON", false
  );
  const [defaultAccessItem, setDefaultAccessItem] = useLocalStorage(
    "WPS_WORKING_SPACE_DEFAULT_ACCESS", false
  );
  const [anchorElStartButton, setAnchorElStartButton] = React.useState(null);
  const [anchorElAddGroup, setAnchorElAddGroup] = React.useState(null);
  const [anchorElAddBoard, setAnchorElAddBoard] = React.useState(null);
  const [anchorElGroup, setAnchorElGroup] = React.useState(null);
  const [openCreateGroup, setOpenCreateGroup] = React.useState(false);
  const [openModalPersonalBoard, setOpenModalPersonalBoard] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
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
    setIsHideStartButton(true);
  }

  function handleSetDefault(value) {
    setDefaultAccessItem(value);
  }

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
          {!isHideStartButton && (
            <Box className={"view_ProjectGroup_List--startButton"} onClick={() => history.push("/projects/start")}>
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
                <ListItem
                  className={"view_ProjectGroup_List-customListItem"}
                  onClick={() => history.push("/projects/recently")}
                >
                  <ListItemIcon>
                    <AccessTimeIcon/>
                  </ListItemIcon>
                  <ListItemText primary={t("LABEL_SEE_RECENTLY")}/>
                </ListItem>
                <ListItem
                  className={"view_ProjectGroup_List-customListItem"}
                  onClick={() => history.push("/projects/personal-board")}
                >
                  <ListItemIcon>
                    <PersonPinCircleOutlinedIcon/>
                  </ListItemIcon>
                  <ListItemText primary={t("LABEL_PERSONAL_BOARD")}/>
                  <IconButton
                    className={"rightIconControlList"} size={"small"}
                    onClick={(evt) => {
                      evt.stopPropagation();
                      setAnchorElAddBoard(evt.currentTarget);
                    }}
                  >
                    <Icon path={mdiDotsVertical} size={1} color={"rgba(0,0,0,0.54)"}/>
                  </IconButton>
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
                          <Button color={"primary"} onClick={(evt) =>  {
                            evt.stopPropagation();
                            setOpenModalPersonalBoard(true);
                            setAnchorElAddBoard(null);
                          }}>
                            {t("IDS_WP_COMMON_ADD")}
                          </Button>
                        </Box>
                      </Box>
                      <Box className={"personalBoard-actionItemWrapper"}>
                        <span className={"title"}>{t("LABEL_SET_DEFAULT")}</span>
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
                </ListItem>
              </List>
            </Box>
          </Box>
          <Box className={"view_ProjectGroup_List--listGroup"}>
            <Box
              className={"view_ProjectGroup_List--listGroup-header"}
              onClick={() => history.push("/projects")}
            >
              <PeopleOutlineOutlinedIcon htmlColor={"#DB7B48"}/>
              <span>{t("LABEL_WORKING_GROUP")}</span>
              <IconButton
                size={"small"} className={"rightIconControlList"}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setAnchorElAddGroup(evt.currentTarget);
                }}
              >
                <Icon path={mdiPlus} size={1} color={"rgba(0,0,0,0.54)"}/>
              </IconButton>
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
                    }}
                  >{t("Thêm nhóm")}</Button>
                </Box>
              </Popover>
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
                                  className={"view_ProjectGroup_List-customListItem"}
                                  onClick={() => history.push(`/projects?groupID=${projectGroup.id}`)}
                                >
                                  <div
                                    {...provided.dragHandleProps}
                                    className={"view_ProjectGroup_List-customListItem-dragIcon"}
                                  >
                                    <Icon path={mdiDragVertical} size={1} />
                                  </div>
                                  <ListItemIcon>
                                    <CustomAvatar
                                      style={{marginRight: "10px", width: 25, height: 25}}
                                      src={get(projectGroup, 'icon')}
                                      alt='avatar'
                                    />
                                  </ListItemIcon>
                                  <ListItemText primary={`${get(projectGroup, "name")} (${projectGroup.number_project})`}/>
                                  <IconButton
                                    className={"rightIconControlList"} size={"small"}
                                    onClick={(evt) => {
                                      evt.stopPropagation();
                                      setAnchorElGroup(evt.currentTarget);
                                    }}
                                  >
                                    <Icon path={mdiDotsVertical} size={1} color={"rgba(0,0,0,0.54)"}/>
                                  </IconButton>
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
                                            handleSetDefault(`?groupID=${evt.currentTarget.id}`);
                                          }}>
                                            {t("LABEL_SET")}
                                          </Button>
                                        </Box>
                                      </Box>
                                    </Box>
                                    <Divider/>
                                    <MenuList>
                                      <MenuItem onClick={(evt) => {
                                        evt.stopPropagation();
                                        setAnchorElGroup(null);
                                        setSelectedGroup(projectGroup);
                                        setOpenCreateGroup(true);
                                      }}>{t("IDS_WP_EDIT_TEXT")}</MenuItem>
                                      <MenuItem>{t("IDS_WP_DELETE")}</MenuItem>
                                    </MenuList>
                                  </Popover>
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
    </>
  )
}

export default ProjectList;
