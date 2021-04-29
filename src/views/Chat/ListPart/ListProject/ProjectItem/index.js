import clsx from 'clsx';
import React from 'react';
import { useSelector } from "react-redux";
import './styles.scss';

const ProjectItem = ({
  project,
  onClickProject,
  title
}) => {

  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const isSelected = project.id === projectId
  function onClickItem() {
    onClickProject(project)
  }

  return (
    <div className={clsx("projectItem", { "projectItem__selected": isSelected })}
      onClick={onClickItem}
    >
      {title}
    </div>
  );
};

export default ProjectItem