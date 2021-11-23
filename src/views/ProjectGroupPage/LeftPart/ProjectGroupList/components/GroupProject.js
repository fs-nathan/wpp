import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import { mdiDotsVertical, mdiDragVertical, mdiPlus } from "@mdi/js";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import Icon from "@mdi/react";
import CustomAvatar from "components/CustomAvatar";
import { Routes } from "constants/routes";
import { get } from "lodash-es";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { NavLink } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const useStyles = makeStyles((theme) => ({
  projectItem: {
    padding: "5px 0",
    paddingLeft: "45px",
    "&:hover, &.active": {
      backgroundColor: "#e5e5e5!important",
      color: "rgb(0, 145, 67)",
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
  projectIcon: { minWidth: "auto", marginRight: 5 },
  projectIconChecked: { display: "none", color: "rgb(0, 145, 67)" },
  projectIconOutLine: { display: "flex" },
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
  defaultAccessItem,
  index,
  setOpenCreateGroup,
  setAnchorElAddGroup,
  setSelectedGroup,
  setAnchorElGroup,
}) => {
  const [isActive, setIsActive] = useState(true);

  const _toggleExpand = () => {
    setIsActive(!isActive);
  };

  return (
    <Draggable draggableId={get(projectGroup, "id")} index={index}>
      {(provided, snapshot) => (
        <>
          <ListItem
            ref={provided.innerRef}
            {...provided.draggableProps}
            component={PathNavLink}
            className="view_ProjectGroup_List-customListItem"
            style={{ paddingLeft: 42 }}
            to={`/projects?groupID=${projectGroup.id}`}
          >
            <div
              {...provided.dragHandleProps}
              className={"view_ProjectGroup_List-customListItem-dragIcon"}
            >
              <Icon path={mdiDragVertical} size={1} />
            </div>

            <ListItemIcon>
              <CustomAvatar
                style={{
                  marginRight: "10px",
                  width: 25,
                  height: 25,
                }}
                src={get(projectGroup, "icon")}
                alt="avatar"
              />
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
            />

            {defaultAccessItem === `?groupID=${projectGroup.id}` && (
              <FlagOutlinedIcon htmlColor={"red"} />
            )}

            <div
              className="wp-wrapper-button"
              onClick={(evt) => {
                evt.preventDefault();
                setOpenCreateGroup(true);
                setAnchorElAddGroup(null);
                setSelectedGroup(null);
              }}
            >
              <AddIcon sx={{ color: "rgba(0,0,0,0.54)" }} />
            </div>

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
                  onClick={_toggleExpand}
                />
              ) : (
                <KeyboardArrowDownOutlinedIcon
                  sx={{ color: "rgba(0,0,0,0.54)" }}
                  onClick={_toggleExpand}
                />
              )}
            </div>
          </ListItem>

          <CollapseListProject
            data={projectGroup.projects}
            isActive={isActive}
          />
        </>
      )}
    </Draggable>
  );
};

const CollapseListProject = ({ data = [], isActive = true }) => {
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
                return id[3] === item.id;
              }}
              style={{ paddingLeft: 80 }}
              to={`${Routes.PROJECT}/${item.id}`}
            >
              <ListItemIcon
                className={[classes.projectIcon, classes.projectIconChecked]}
              >
                <RadioButtonCheckedIcon />
              </ListItemIcon>

              <ListItemIcon
                className={[classes.projectIcon, classes.projectIconOutLine]}
              >
                <RadioButtonUncheckedIcon />
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
