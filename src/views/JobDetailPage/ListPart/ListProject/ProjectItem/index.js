import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';

import { chooseTask } from "../../../../../actions/taskDetail/taskDetailActions";
import './styles.scss';

const ProjectItem = props => {
  const dispatch = useDispatch();
  const history = useHistory();

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
    <div className="projectItem"
      onClick={onClickProject}
    >
      {props.title}
    </div>
  );
};

export default ProjectItem