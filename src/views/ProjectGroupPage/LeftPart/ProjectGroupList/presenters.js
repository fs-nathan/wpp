import {
  Box,
  Button,
  ButtonGroup,
  Divider,
  IconButton,
  List,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@material-ui/core";
import SvgIcon from "@material-ui/core/SvgIcon";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import {
  mdiBookmarkOutline,
  mdiDotsVertical,
  mdiPlayCircleOutline,
  mdiPlus,
} from "@mdi/js";
import Icon from "@mdi/react";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import StarBorderIcon from "@mui/icons-material/StarBorder";

import LibraryAddCheckOutlined from "@mui/icons-material/LibraryAddCheckOutlined";
import { size } from "lodash";
import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Scrollbars } from "react-custom-scrollbars";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { useLocalStorage } from "react-use";
import styled from "styled-components";
import SearchInput from "../../../../components/SearchInput";
import {
  CustomEventDispose,
  CustomEventListener,
} from "../../../../constants/events";
import AddToPersonalBoardModal from "../../Modals/AddPersonalBoard";
import CreateProjectGroup from "../../Modals/CreateProjectGroup";
import ProjectGroupDelete from "../../Modals/DeleteProjectGroup";
import { GroupProject } from "./components";
import "./style.scss";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import { defaultGroupTask } from "actions/groupTask/defaultGroupTask";
import { TEMPLATE } from "mocks/template";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { Collapse, ListItem, ListItemButton } from "@mui/material";

const Banner = ({ className = "", ...props }) => (
  <div className={`view_ProjectGroup_List___banner ${className}`} {...props} />
);

const LeftContainer = styled.div`
  background: #f1f2f4;
  height: 100vh;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
`;

function ProjectList({
  groups,
  route,
  canModify,
  searchPattern,
  setSearchPattern,
  handleSortProjectGroup,
  handleOpenModal,
}) {
  const history = useHistory();
  const { t } = useTranslation();
  const [isHideStartButton] = useLocalStorage(
    "WPS_HIDE_WORKING_START_BUTTON",
    false
  );
  const idGroupDefault = useSelector(
    ({ groupTask }) => groupTask.defaultGroupTask.data || ""
  );
  const idGroupDefaultLocal = localStorage.getItem(
    "WPS_WORKING_SPACE_DEFAULT_ACCESS"
  );

  const isDefaultGroup = idGroupDefault === "?" || "?" === idGroupDefaultLocal;
  const [hideBtnState, setHideBtnState] = React.useState(isHideStartButton);
  const dispatch = useDispatch();
  const [anchorElStartButton, setAnchorElStartButton] = React.useState(null);
  const [anchorElAddGroup, setAnchorElAddGroup] = React.useState(null);
  const [anchorElSetDefault, setAnchorElSetDefault] = React.useState(null);
  const [anchorElAddBoard, setAnchorElAddBoard] = React.useState(null);
  const [anchorElGroup, setAnchorElGroup] = React.useState(null);
  const [openCreateGroup, setOpenCreateGroup] = React.useState(false);
  const [openModalPersonalBoard, setOpenModalPersonalBoard] =
    React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);
  const [alertConfirm, showAlertConfirm] = React.useState(false);

  const isHasProjectRecently = useSelector(
    (state) => state.project.checkHasRecently.hasRecently
  );
  const params = new URLSearchParams(window.location.search);
  const groupID = params.get("groupID");
  const personalProjectsBoard = useSelector(
    (state) => state.project.countPersonalProjectsBoard.projects
  );

  const [open, setOpen] = React.useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;
    handleSortProjectGroup(draggableId, destination.index);
  }

  function handleHideStartBtn(evt) {
    evt.stopPropagation();
    setAnchorElStartButton(null);
    localStorage.setItem("WPS_HIDE_WORKING_START_BUTTON", true);
    setHideBtnState(true);
    if (history.location.pathname === "/projects/start") {
      history.push("/projects/recently");
    }
  }

  function handleSetDefault(value) {
    if (value !== null) dispatch(defaultGroupTask(value));
  }

  function handleDeleteGroup(evt) {
    evt.stopPropagation();
    showAlertConfirm(true);
    setAnchorElGroup(null);
  }

  React.useEffect(() => {
    CustomEventListener("WPS_HIDE_WORKING_START_BUTTON", (e) => {
      setHideBtnState(e.detail.isHide);
    });
    CustomEventDispose("WPS_HIDE_WORKING_START_BUTTON", (e) => {
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
            onChange={(evt) => setSearchPattern(evt.target.value)}
            style={{ background: "#fff" }}
          />
        </Banner>
        <Box className={"view_ProjectGroup_List--LeftContainer"}>
          <Box>
            <Box
              className={`view_ProjectGroup_List--startButton ${
                history.location.pathname.includes("/projects/template") &&
                "active"
              }`}
              onClick={() => history.push("/projects/template")}
            >
              <LibraryAddCheckOutlined htmlColor="#d46ffb" />
              <span>{t("LABEL_CHAT_TASK_THU_VIEN_MAU_LABEL")}</span>
            </Box>

            {history.location.pathname.includes("/projects/template") && (
              <Box
              // className={"view_ProjectGroup_List--listGroup-body scrollList"}
              >
                <List>
                  {TEMPLATE.map((temp) => (
                    <>
                      <ListItem
                        disablePadding
                        disableGutters
                        key={temp.id}
                        // className="view_ProjectGroup_List-customListItem view_ProjectGroup_List-customListItem-nav"
                      >
                        <ListItemButton onClick={handleClick} sx={{ pl: 6 }}>
                          <ListItemText primary={temp.name} />
                          {temp.templates &&
                            temp.templates.length > 0 &&
                            (open ? <ExpandLess /> : <ExpandMore />)}
                        </ListItemButton>
                      </ListItem>
                      {temp.templates && temp.templates.length > 0 && (
                        <Collapse in={open} timeout="auto" unmountOnExit>
                          <List component="div">
                            {temp.templates.map((child) => (
                              <ListItem
                                disablePadding
                                disableGutters
                                key={child.id}
                              >
                                <ListItemButton sx={{ pl: 8 }}>
                                  <ListItemText primary={child.name} />
                                </ListItemButton>
                              </ListItem>
                            ))}
                          </List>
                        </Collapse>
                      )}
                    </>
                  ))}
                </List>
              </Box>
            )}
          </Box>

          <Box className={"view_ProjectGroup_List--listGroup"}>
            <Box
              className={"view_ProjectGroup_List--listGroup-header textHeader"}
            >
              <Icon path={mdiBookmarkOutline} size={1} color={"#009CF3"} />
              <span>{t("LABEL_SHORTCUT_PANEL")}</span>
            </Box>
            <Box className={"view_ProjectGroup_List--listGroup-body"}>
              <List component={"nav"}>
                {isHasProjectRecently && (
                  <NavLink
                    to="/projects/recently"
                    className="MuiListItem-root view_ProjectGroup_List-customListItem MuiListItem-gutters"
                    style={{ paddingLeft: 42 }}
                  >
                    <ListItemIcon>
                      <AccessTimeIcon />
                    </ListItemIcon>
                    <ListItemText primary={t("LABEL_SEE_RECENTLY")} />
                  </NavLink>
                )}
                <NavLink
                  to="/projects/personal-board"
                  className="MuiListItem-root view_ProjectGroup_List-customListItem MuiListItem-gutters"
                  style={{ paddingLeft: 42 }}
                >
                  <ListItemIcon>
                    <StarBorderIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={`${t("LABEL_PERSONAL_BOARD")} (${size(
                      personalProjectsBoard
                    )})`}
                  />
                  {/* {defaultAccessItem === "/personal-board" && (
                    <FlagOutlinedIcon
                      color={"disabled"}
                      style={{ marginLeft: 10, color: "red" }}
                    />
                  )} */}
                  <div className="wp-wrapper-button">
                    <MoreVertIcon
                      onClick={(evt) => {
                        evt.stopPropagation();
                        evt.preventDefault();
                        setAnchorElAddBoard(evt.currentTarget);
                      }}
                      sx={{ color: "rgba(0, 0, 0, 0.54)" }}
                    />
                  </div>
                </NavLink>
              </List>
            </Box>
          </Box>
          <Box className={"view_ProjectGroup_List--listGroup"}>
            <Box
              className={`view_ProjectGroup_List--listGroup-header ${
                history.location.pathname === "/projects" && "active"
              }`}
              onClick={() => history.push("/projects")}
            >
              <SvgIcon htmlColor={"#DB7B48"}>
                <path d="M6,13c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S8.2,13,6,13z M12,3C9.8,3,8,4.8,8,7s1.8,4,4,4s4-1.8,4-4S14.2,3,12,3z M18,13 c-2.2,0-4,1.8-4,4s1.8,4,4,4s4-1.8,4-4S20.2,13,18,13z" />
              </SvgIcon>
              <span>{t("LABEL_WORKING_GROUP")}</span>

              <div className="wp-wrapper">
                {isDefaultGroup && <FlagOutlinedIcon htmlColor={"red"} />}
                <div className="wp-wrapper-button">
                  <abbr title={t("Thêm nhóm")}>
                    <AddIcon
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setAnchorElAddGroup(evt.currentTarget);
                      }}
                      sx={{ color: "rgba(0,0,0,0.54)" }}
                    >
                      <Icon path={mdiPlus} size={1} />
                    </AddIcon>
                  </abbr>
                </div>
                <div className="wp-wrapper-button">
                  <abbr title={t("Tuỳ chọn")}>
                    <SvgIcon
                      size={"small"}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setAnchorElSetDefault(evt.currentTarget);
                      }}
                    >
                      <Icon
                        path={mdiDotsVertical}
                        size={1}
                        color={"rgba(0,0,0,0.54)"}
                      />
                    </SvgIcon>
                  </abbr>
                </div>
              </div>
              <Popover
                open={Boolean(anchorElSetDefault)}
                anchorEl={anchorElSetDefault}
                disableRestoreFocus
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                onClose={() => setAnchorElSetDefault(null)}
                elevation={1}
              >
                <Box className={"startBtnSetting-container"}>
                  <span className={"text-primary"}>
                    {t("LABEL_SET_DEFAULT")}
                  </span>
                  <div className="description-container">
                    <Typography
                      color={"textSecondary"}
                      className="text-secondary"
                    >
                      {t("LABEL_SET_DEFAULT_DES")}
                    </Typography>
                    <Button
                      color={"primary"}
                      onClick={(evt) => {
                        evt.stopPropagation();
                        setAnchorElSetDefault(null);
                        handleSetDefault("?");
                      }}
                    >
                      {t("LABEL_SET")}
                    </Button>
                  </div>
                </Box>
              </Popover>
            </Box>
            <Box
              className={"view_ProjectGroup_List--listGroup-body scrollList"}
            >
              <Scrollbars autoHide autoHideTimeout={500}>
                <List component={"nav"} className={""}>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                        >
                          {groups.groups.map((projectGroup, index) => (
                            <GroupProject
                              key={index}
                              index={index}
                              groupID={groupID}
                              // defaultAccessItem={defaultAccessItem}
                              projectGroup={projectGroup}
                              setOpenCreateGroup={setOpenCreateGroup}
                              setAnchorElAddGroup={setAnchorElAddGroup}
                              setSelectedGroup={setSelectedGroup}
                              setAnchorElGroup={setAnchorElGroup}
                            />
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
      <CreateProjectGroup
        open={openCreateGroup}
        setOpen={setOpenCreateGroup}
        updatedProjectGroup={selectedGroup}
      />
      <AddToPersonalBoardModal
        open={openModalPersonalBoard}
        setOpen={setOpenModalPersonalBoard}
      />
      <Popover
        open={Boolean(anchorElAddGroup)}
        anchorEl={anchorElAddGroup}
        disableRestoreFocus
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
            color="primary"
            className={"btnAddGroup"}
            onClick={(evt) => {
              evt.stopPropagation();
              setOpenCreateGroup(true);
              setAnchorElAddGroup(null);
              setSelectedGroup(null);
            }}
          >
            {t("Thêm nhóm")}
          </Button>
        </Box>
      </Popover>
      <Popover
        open={Boolean(anchorElGroup)}
        anchorEl={anchorElGroup}
        disableRestoreFocus
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
              <Typography variant={"body2"} color={"textSecondary"}>
                {t("LABEL_SET_DEFAULT_DES")}
              </Typography>
              <Button
                color={"primary"}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setAnchorElGroup(null);
                  handleSetDefault(`?groupID=${selectedGroup.id}`);
                }}
              >
                {t("LABEL_SET")}
              </Button>
            </Box>
          </Box>
        </Box>
        {canModify && (
          <>
            <Divider />
            <MenuList>
              <MenuItem
                onClick={(evt) => {
                  evt.stopPropagation();
                  setAnchorElGroup(null);
                  setSelectedGroup(selectedGroup);
                  setOpenCreateGroup(true);
                }}
              >
                {t("IDS_WP_EDIT_TEXT")}
              </MenuItem>
              <MenuItem onClick={(evt) => handleDeleteGroup(evt)}>
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
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
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
              <Typography variant={"body2"} color={"textSecondary"}>
                {t("LABEL_ADD_TABLE_DES")}
              </Typography>
              <Button
                color={"primary"}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setOpenModalPersonalBoard(true);
                  setAnchorElAddBoard(null);
                }}
              >
                {t("IDS_WP_COMMON_ADD")}
              </Button>
            </Box>
          </Box>
          <Box className={"personalBoard-actionItemWrapper"}>
            <span className={"title"}>{t("LABEL_SET_DEFAULT")}</span>
            <Box className={"actionItem"}>
              <Typography variant={"body2"} color={"textSecondary"}>
                {t("LABEL_SET_DEFAULT_DES")}
              </Typography>
              <Button
                color={"primary"}
                onClick={(evt) => {
                  evt.stopPropagation();
                  setAnchorElAddBoard(null);
                  handleSetDefault("/personal-board");
                }}
              >
                {t("LABEL_SET")}
              </Button>
            </Box>
          </Box>
        </Box>
      </Popover>
      <ProjectGroupDelete
        selectedProjectGroup={selectedGroup}
        open={alertConfirm}
        setOpen={showAlertConfirm}
        redirectURL={"/projects/recently"}
      />
    </>
  );
}

export default ProjectList;
