import { chooseTask } from "actions/taskDetail/taskDetailActions";
import React from 'react';
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom';
import ListProject from '../ListPart/ListProject';
import ListBanner from './ListBanner';
import ListBody from './ListBody';
import ListHeader from './ListHeader';

function ListTask(props) {
  return (
    <div className={"wrap-list-task " + (props.show === true ? "wlt-block" : "wlt-none")}>
      <div className="wlt-header">
        <ListHeader {...props} />
        <ListBanner />
      </div>
      <ListBody />
    </div>

  )
}

function ListPart(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showListProject, setShow] = React.useState(false)

  function onClickProject(project) {
    // console.log('Click item ', props);
    history.push(`/tasks/chat/` + project.id);
    // value.getDetailProject(project.id)
    // value.chooseProject(project)
    dispatch(chooseTask(null));
    setShow(false);
  }

  return (
    <div className="container-lp">
      <ListTask show={!showListProject} setShow={setShow} />
      <ListProject show={showListProject} setShow={setShow} onClickProject={onClickProject} />
    </div>
  )
}

export default ListPart;
