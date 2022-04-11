import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Tooltip from "@mui/material/Tooltip";
import LoadingBox from "components/LoadingBox";
import {
  CustomEventDispose,
  CustomEventListener,
  EDIT_PROJECT_GROUP,
  LIST_PROJECT_GROUP,
} from "constants/events";
import { get } from "lodash";
import PropTypes from "prop-types";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import "./projectGroupGrid.scss";
import { NavLink } from "react-router-dom";

export const DISABLED_GROUP_BACKGROUND_COLOR = "#e7e8e9";
export const DEFAULT_GROUP_BACKGROUND_COLOR = "#da4bbe";
const TooltipContent = ({ groupName, groupDescription }) => {
  return (
    <div className="projectGroup__tooltip--body">
      <div className="projectGroup__tooltip--title">{groupName || ""}</div>
      <p className="projectGroup__tooltip--description">
        {groupDescription || ""}
      </p>
    </div>
  );
};

const ProjectGroupGrid = ({
  projectGroups = [],
  onEdit,
  handleSortProjectGroup,
  setCurrentGroup,
  doReloadList,
  setActiveLoading,
  activeLoading,
}) => {
  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(EDIT_PROJECT_GROUP.SUCCESS, doReloadList);
    CustomEventListener(EDIT_PROJECT_GROUP.FAIL, fail);

    return () => {
      CustomEventDispose(EDIT_PROJECT_GROUP.SUCCESS, doReloadList);
      CustomEventDispose(EDIT_PROJECT_GROUP.FAIL, fail);
    };
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT_GROUP.SUCCESS, success);
    CustomEventListener(LIST_PROJECT_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT_GROUP.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT_GROUP.FAIL, fail);
    };
  }, []);
  const idGroupDefault = useSelector(
    ({ groupTask }) => groupTask.defaultGroupTask.data || ""
  );
  const idGroupDefaultLocal = localStorage.getItem(
    "WPS_WORKING_SPACE_DEFAULT_ACCESS"
  );

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    console.log("source", source);
    console.log("destination", destination);

    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    handleSortProjectGroup(draggableId, destination.index);
  }

  console.log("activeLoading", activeLoading);

  if (activeLoading) return <LoadingBox />;

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="projectGroupListGrid"
            >
              {projectGroups.map((projectGroup, index) => {
                const isDefaultGroup =
                  idGroupDefault === `?groupID=${projectGroup.id}` ||
                  `?groupID=${projectGroup.id}` === idGroupDefaultLocal;
                const isDisplayUpdate = get(projectGroup, "can_modify", false);

                const backgroundColor =
                  projectGroup.color || DEFAULT_GROUP_BACKGROUND_COLOR;
                return (
                  <Draggable
                    key={projectGroup.id}
                    draggableId={projectGroup.id}
                    index={index}
                    className="projectGroupListGrid__item"
                    style={{ backgroundColor: backgroundColor }}
                  >
                    {(provided) => {
                      return (
                        <NavLink
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="projectGroupListGrid__item"
                          style={{ backgroundColor: backgroundColor }}
                          to={`/projects?groupID=${projectGroup.id}`}
                        >
                          <div>{projectGroup?.name}</div>

                          <div className="projectGroupListGrid__icon">
                            <div className="projectGroupListGrid__icon--list">
                              <div className="projectGroupListGrid__icon--item">
                                <ArticleOutlinedIcon />
                                <span className="projectGroupListGrid__icon--number">
                                  {projectGroup?.number_project || 0}
                                </span>
                              </div>

                              {isDefaultGroup && (
                                <div className="projectGroupListGrid__icon--item">
                                  <FlagOutlinedIcon />
                                </div>
                              )}
                            </div>

                            <div className="projectGroupListGrid__icon--list ">
                              <Tooltip
                                title={
                                  <TooltipContent
                                    groupName={projectGroup.name}
                                    groupDescription={projectGroup.description}
                                  />
                                }
                                arrow
                                classes={{
                                  tooltip: "Custom-MuiTooltip-tooltip",
                                }}
                                placement="top"
                              >
                                <div className="wp-wrapper-button">
                                  <InfoOutlinedIcon />
                                </div>
                              </Tooltip>

                              {isDisplayUpdate && (
                                <div
                                  onClick={(e) => {
                                    e.preventDefault();
                                    onEdit(e.currentTarget, projectGroup);
                                    setCurrentGroup(projectGroup);
                                  }}
                                  className="wp-wrapper-button"
                                >
                                  <MoreVertOutlinedIcon />
                                </div>
                              )}
                            </div>
                          </div>
                        </NavLink>
                      );
                    }}
                  </Draggable>
                );
              })}
              {/* <div
                className="projectGroupListGrid__item"
                style={{ backgroundColor: DISABLED_GROUP_BACKGROUND_COLOR }}
              >
                <AddOutlinedIcon />
              </div> */}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
};

ProjectGroupGrid.propTypes = {
  projects: PropTypes.array,
};

export default ProjectGroupGrid;
