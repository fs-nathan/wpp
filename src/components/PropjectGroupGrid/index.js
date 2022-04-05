import React from "react";
import "./projectGroupGrid.scss";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PropTypes from "prop-types";
import Scrollbars from "react-custom-scrollbars/lib/Scrollbars";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Tooltip from "@mui/material/Tooltip";
import { get } from "lodash";

const DEFAULT_GROUP_BACKGROUND_COLOR = "#da4bbe";

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

const ProjectGroupGrid = ({ projects = [], onEdit, onOpenEditModal }) => {
  return (
    <div className="projectGroupListGrid">
      {projects.map((project) => {
        const isDisplayUpdate =
          get(project, "can_update", false) &&
          get(project, "can_delete", false);

        const backgroundColor =
          project["project_label"]?.color || DEFAULT_GROUP_BACKGROUND_COLOR;
        return (
          <div
            key={project.id}
            className="projectGroupListGrid__item"
            style={{ backgroundColor: backgroundColor }}
          >
            <div>{project?.name}</div>

            <div className="projectGroupListGrid__icon">
              <div className="projectGroupListGrid__icon--list">
                <div className="projectGroupListGrid__icon--item">
                  <ArticleOutlinedIcon />
                  <span className="projectGroupListGrid__icon--number">
                    {project?.statistic?.total_task || 0}
                  </span>
                </div>

                <div className="projectGroupListGrid__icon--item">
                  <FlagOutlinedIcon />
                </div>
              </div>

              <div className="projectGroupListGrid__icon--list ">
                <Tooltip
                  title={
                    <TooltipContent
                      groupName={project.name}
                      groupDescription={project.description}
                    />
                  }
                  arrow
                  classes={{ tooltip: "Custom-MuiTooltip-tooltip" }}
                  placement="top"
                >
                  <div className="wp-wrapper-button">
                    <InfoOutlinedIcon />
                  </div>
                </Tooltip>

                {isDisplayUpdate && (
                  <div
                    onClick={(e) => onEdit(e.currentTarget, project)}
                    className="wp-wrapper-button"
                  >
                    <MoreVertOutlinedIcon />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}

      <div className="projectGroupListGrid__item">
        <AddOutlinedIcon />
      </div>
    </div>
  );
};

ProjectGroupGrid.propTypes = {
  projects: PropTypes.array,
};

export default ProjectGroupGrid;
