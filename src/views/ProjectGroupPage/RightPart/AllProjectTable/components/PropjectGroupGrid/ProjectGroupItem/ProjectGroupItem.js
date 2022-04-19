import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import { NavLink } from "react-router-dom";
import "../projectGroupGrid.scss";

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

function ProjectGroupItem({
  backgroundColor,
  projectGroup,
  isDefaultGroup,
  isDisplayUpdate,
  handleClickEdit,
}) {
  return (
    <div
      className="projectGroupListGrid__item"
      style={{ backgroundColor: backgroundColor }}
      // to={`/projects?groupID=${projectGroup.id}`}
    >
      <div className="projectGroupListGrid__item--title">
        {projectGroup?.name}
      </div>

      <div className="projectGroupListGrid__icon">
        <div className="projectGroupListGrid__icon--list">
          <label
            className="projectGroupListGrid__icon--item"
            title={`${projectGroup?.number_project || 0} bảng việc`}
          >
            <ArticleOutlinedIcon />
            <span className="projectGroupListGrid__icon--number">
              {projectGroup?.number_project || 0}
            </span>
          </label>

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
              tooltip: "projectGroupListGrid__tooltip",
            }}
            placement="top"
          >
            <div className="wp-wrapper-button">
              <InfoOutlinedIcon />
            </div>
          </Tooltip>

          {isDisplayUpdate && (
            <div onClick={handleClickEdit} className="wp-wrapper-button">
              <MoreVertOutlinedIcon />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectGroupItem;
