import React from 'react';
import ListHeader from './ListHeader';
import ListBanner from './ListBanner';
import ListBody from './ListBody';
import ListProject from '../ListPart/ListProject'

function ListTask(props) {
  return (
    <div className={"wrap-list-task " + (props.show === true ? "wlt-block" : "wlt-none") }>
        <div className="wlt-header">
          <ListHeader {...props} />
          <ListBanner />
        </div>
        <ListBody/>
    </div>

  )
}

function ListPart(props) {
  const [showListProject, setShow] = React.useState(false)

  return (
    <div className="container-lp">
      <ListTask show={!showListProject} setShow={setShow} />
      <ListProject show={showListProject} setShow={setShow} history={props.history}/>
    </div>
  )
}

export default ListPart;
