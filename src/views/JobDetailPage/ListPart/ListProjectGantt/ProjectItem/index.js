import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { chooseTask } from "../../../../../actions/taskDetail/taskDetailActions";
import "./styles.scss";
import {get} from "lodash";
import {workTypes} from "../../../../../constants/workTypes";
import {useTranslation} from "react-i18next";
import {resolvedWorkType} from "../../../../../helpers/project/commonHelpers";

const ProjectItem = (props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const history = useHistory();
  const projectId = useSelector(
    (state) => state.taskDetail.commonTaskDetail.activeProjectId
  );
  const isSelected = props.project.id === projectId;

  function onClickProject() {
    history.push(`/projects/task-gantt/` + props.project.id);
    dispatch(chooseTask(null));
    props.setShow(false, true);
  }

  return (
    <div
      className={clsx("projectItem", { projectItem__selected: isSelected })}
      onClick={onClickProject}
    >
      <span>{props.title}</span>
      <div className={"projectItem--workingType"}>
        <img
          src={resolvedWorkType(get(props.project, 'work_type', 0))}
          alt={""} width={25} height={25}
        />
      </div>
      <span>{`[${t(workTypes[get(props.project, 'work_type', 0)])}]`}</span>
    </div>
  );
};

export default ProjectItem;
