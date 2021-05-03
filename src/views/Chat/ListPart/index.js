import React from 'react';
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
  return (
    <div className="container-lp">
      <ListTask />
    </div>
  )
}

export default ListPart;
