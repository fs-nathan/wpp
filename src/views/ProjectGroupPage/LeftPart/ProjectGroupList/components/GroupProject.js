import {
  Collapse,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import FlagOutlinedIcon from "@material-ui/icons/FlagOutlined";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import RadioButtonCheckedIcon from "@material-ui/icons/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@material-ui/icons/RadioButtonUnchecked";
import CustomAvatar from "components/CustomAvatar";
import { get } from "lodash-es";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { Link, useHistory } from "react-router-dom";
import { mdiDotsVertical, mdiDragVertical, mdiPlus } from "@mdi/js";
import Icon from "@mdi/react";

const useStyles = makeStyles((theme) => ({
  projectItem: {
    padding: "5px 0",
    paddingLeft: "45px",
    "&:hover": {
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
      width: 220,
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
  const history = useHistory();
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
            className="view_ProjectGroup_List-customListItem"
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

            <IconButton className={"rightIconControlList"} size={"small"}>
              <Icon
                onClick={(evt) => {
                  evt.stopPropagation();
                  setOpenCreateGroup(true);
                  setAnchorElAddGroup(null);
                  setSelectedGroup(null);
                }}
                path={mdiPlus}
                size={1}
                color={"rgba(0,0,0,0.54)"}
              />
            </IconButton>

            <IconButton
              className={"rightIconControlList"}
              size={"small"}
              onClick={(evt) => {
                evt.stopPropagation();
                setAnchorElGroup(evt.currentTarget);
                setSelectedGroup(projectGroup);
              }}
            >
              <Icon
                path={mdiDotsVertical}
                size={1}
                color={"rgba(0,0,0,0.54)"}
              />
            </IconButton>

            <IconButton
              size={"small"}
              className={"rightIconControlList"}
              onClick={(e) => e.stopPropagation()}
            >
              {isActive ? (
                <ExpandLess
                  size={1}
                  color={"rgba(0,0,0,0.54)"}
                  onClick={_toggleExpand}
                />
              ) : (
                <ExpandMore
                  size={1}
                  color={"rgba(0,0,0,0.54)"}
                  onClick={_toggleExpand}
                />
              )}
            </IconButton>
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
              component={Link}
              to={`/projects/task-table/${item.id}`}
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
