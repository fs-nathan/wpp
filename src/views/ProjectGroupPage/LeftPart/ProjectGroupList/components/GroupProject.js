import {
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { mdiDragVertical } from "@mdi/js";
import Icon from "@mdi/react";
import AddIcon from "@mui/icons-material/Add";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CustomAvatar from "components/CustomAvatar";
import { Routes } from "constants/routes";
import { get } from "lodash-es";
import React, { useEffect, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { NavLink, useLocation, useParams } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  projectItem: {
    padding: "5px 0",
    paddingLeft: "45px",

    "&:hover, &.active": {
      backgroundColor: "#e5e5e5 !important",
      color: "#0076f3 !important",
      "& $projectIconChecked": {
        display: "flex",
      },
      "& $projectIconOutLine": {
        display: "none",
      },
    },
  },
  projectText: {
    "& span": {
      whiteSpace: "nowrap",
      width: 180,
      overflow: "hidden",
      textOverflow: "ellipsis",
    },
  },
  projectIcon: {
    minWidth: "auto",
    marginRight: 5,
  },
  projectIconChecked: { display: "none", color: "#0076f3 !important" },
  projectIconOutLine: {
    display: "flex",
    "& svg": {
      width: "0.9em",
      height: "0.9em",
      color: "#989898",
    },
  },
  groupName: {
    whiteSpace: "nowrap",
  },
}));

const PathNavLink = (props) => {
  const propsSearch = `?${props.to.split("?")[1]}`;
  return (
    <NavLink isActive={(_, { search }) => search === propsSearch} {...props} />
  );
};

export const GroupProject = ({
  projectGroup,
  groupID,
  index,
  setOpenCreateGroup,
  setAnchorElAddGroup,
  setSelectedGroup,
  setAnchorElGroup,
  open,
  close,
  currentProjectGroup,
}) => {
  const idGroupDefault = useSelector(
    ({ groupTask }) => groupTask.defaultGroupTask.data || ""
  );
  const idGroupDefaultLocal = localStorage.getItem(
    "WPS_WORKING_SPACE_DEFAULT_ACCESS"
  );
  const { pathname } = useLocation();

  const [isActive, setIsActive] = useState(
    currentProjectGroup === projectGroup.id
  );
  const params = useParams();
  const isDefaultGroup =
    idGroupDefault === `?groupID=${projectGroup.id}` ||
    `?groupID=${projectGroup.id}` === idGroupDefaultLocal;
  const id = pathname.split("/");

  function handleProjectActive(parentId: string) {
    // setIsActive(projectGroup.id === parentId);
  }
  useEffect(() => {
    if (currentProjectGroup !== projectGroup.id) {
      setIsActive(false);
    }
  }, [currentProjectGroup, projectGroup.id]);
  const _toggleExpand = () => {
    if (!isActive) {
      open(projectGroup.id);
    } else {
      close();
    }
    setIsActive(!isActive);
  };

  const _openExpand = () => {
    open(projectGroup.id);
    setIsActive(true);
  };
  const _closeExpand = () => {
    close();
    setIsActive(false);
  };
  return (
    <Draggable draggableId={get(projectGroup, "id")} index={index}>
      {(provided, snapshot) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <ListItem
            className="view_ProjectGroup_List-customListItem view_ProjectGroup_List-customListItem-nav"
            component={PathNavLink}
            onClick={() => _toggleExpand()}
            to={`/projects?groupID=${projectGroup.id}`}
            // onClick={() => history.push(`/projects?groupID=${projectGroup.id}`)}
          >
            {/* <div
              {...provided.dragHandleProps}
              className={"view_ProjectGroup_List-customListItem-dragIcon"}
            >
              <Icon path={mdiDragVertical} size={1} />
            </div> */}

            <ListItemIcon>
              <div
                style={{
                  // marginRight: "10px",
                  width: 13,
                  height: 13,
                  borderRadius: 3,
                  backgroundColor: get(projectGroup, "color"),
                  marginLeft: 3,
                }}
                // src={get(projectGroup, "icon")}
                alt="avatar"
              ></div>
            </ListItemIcon>

            <ListItemText
              primary={
                <div className="view_ProjectGroup_List-customListItem__textPrimary">
                  <abbr
                    className="view_ProjectGroup_List-customListItem__text"
                    title={get(projectGroup, "name")}
                  >
                    {get(projectGroup, "name")}
                  </abbr>
                  <div>({projectGroup.number_project})</div>
                </div>
              }
              {...provided.dragHandleProps}
            />

            {isDefaultGroup && <FlagOutlinedIcon htmlColor={"red"} />}

            <div
              className="wp-wrapper-button"
              onClick={(evt) => {
                evt.preventDefault();
                setAnchorElGroup(evt.currentTarget);
                setSelectedGroup(projectGroup);
              }}
            >
              <MoreVertIcon sx={{ color: "rgba(0,0,0,0.54)" }} />
            </div>

            <div
              className="wp-wrapper-button"
              onClick={(e) => e.preventDefault()}
            >
              {isActive ? (
                <KeyboardArrowUpOutlinedIcon
                  sx={{ color: "rgba(0,0,0,0.54)" }}
                  onClick={_closeExpand}
                />
              ) : (
                <KeyboardArrowDownOutlinedIcon
                  sx={{ color: "rgba(0,0,0,0.54)" }}
                  onClick={_openExpand}
                />
              )}
            </div>
          </ListItem>

          <CollapseListProject
            parentId={projectGroup.id}
            data={projectGroup.projects}
            isActive={isActive}
            onActive={handleProjectActive}
          />
          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

const CollapseListProject = ({
  parentId,
  onActive,
  data = [],
  isActive = true,
}) => {
  const classes = useStyles();

  return (
    <Collapse in={isActive}>
      <List component="div" disablePadding>
        {data.map((item, index) => {
          return (
            <ListItem
              key={item.id}
              className={classes.projectItem}
              component={NavLink}
              isActive={(match, { pathname }) => {
                const id = pathname.split("/");
                if (id[3] === item.id) onActive(parentId);
                return id[3] === item.id;
              }}
              style={{ paddingLeft: 45 }}
              to={`${Routes.PROJECT}/${item.id}`}
            >
              <ListItemIcon
                className={[classes.projectIcon, classes.projectIconChecked]}
              >
                <CheckCircleIcon />
              </ListItemIcon>

              <ListItemIcon
                className={[classes.projectIcon, classes.projectIconOutLine]}
              >
                <CheckCircleOutlineIcon />
              </ListItemIcon>

              <ListItemText
                className={classes.projectText}
                primary={item.name}
              />
            </ListItem>
          );
        })}
      </List>
    </Collapse>
  );
};
