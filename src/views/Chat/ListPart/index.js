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
    <div className={"wrap-list-task wlt-block"}>
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

  return (
    <div className="container-lp">
      <ListTask />
    </div>
  )
}

export default ListPart;
