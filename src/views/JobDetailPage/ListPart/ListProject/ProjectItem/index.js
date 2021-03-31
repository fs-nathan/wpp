import clsx from 'clsx';
import React from 'react';
import { useSelector } from "react-redux";
import './styles.scss';
import {resolvedWorkType} from "../../../../../helpers/project/commonHelpers";
import {get} from "lodash";
import {workTypes} from "../../../../../constants/workTypes";
import {useTranslation} from "react-i18next";

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
  const { t } = useTranslation();
  return (
    <div className={clsx("projectItem", { "projectItem__selected": isSelected })}
      onClick={onClickItem}
    >
      <span>{title}</span>
      <div className={"projectItem--workingType"}>
        <img
          src={resolvedWorkType(get(project, 'work_type', 0))}
          alt={""} width={25} height={25}
        />
      </div>
      <span>{`[${t(workTypes[get(project, 'work_type', 0)])}]`}</span>
    </div>
  );
};

export default ProjectItem