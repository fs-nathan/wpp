import clsx from 'clsx';
import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom';
import { chooseTask } from "../../../../../actions/taskDetail/taskDetailActions";
import './styles.scss';


const ProjectItem = props => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projectId = useSelector(state => state.taskDetail.commonTaskDetail.activeProjectId);
  const isSelected = props.project.id === projectId

  function onClickProject() {
    console.log('Click item ', props);
    history.push(`/list-task-detail/` + props.project.id);
    // props.value.getDetailProject(props.project.id)
    // props.value.chooseProject(props.project)
    dispatch(chooseTask(null));
    props.setShow(false);
  }

  return (
    // redirect ? <Redirect to='/target' /> :
    <div className={clsx("projectItem", { "projectItem__selected": isSelected })}
      onClick={onClickProject}
    >
      {props.title}
    </div>
  );
};

export default ProjectItem