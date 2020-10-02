import clsx from "clsx";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { chooseTask } from "actions/taskDetail/taskDetailActions";
import { actionVisibleDrawerMessage } from "actions/system/system";
import "./styles.scss";

const ProjectItem = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projectId = useSelector(
    (state) => state.taskDetail.commonTaskDetail.activeProjectId
  );
  const isSelected = props.project.id === projectId;

  function onClickProject() {
    history.push(`/projects/task-kanban/` + props.project.id);
    // props.value.getDetailProject(props.project.id)
    // props.value.chooseProject(props.project)
    dispatch(chooseTask(null));
    dispatch(actionVisibleDrawerMessage({ type: "", anchor: 'left' }));
  }

  return (
    // redirect ? <Redirect to='/target' /> :
    <div
      className={clsx("projectItem", { projectItem__selected: isSelected })}
      onClick={onClickProject}
    >
      {props.title}
    </div>
  );
};

export default ProjectItem;
