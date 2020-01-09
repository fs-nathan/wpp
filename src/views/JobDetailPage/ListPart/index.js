import React from 'react';
import styled from 'styled-components';
import ListHeader from './ListHeader';
import ListBanner from './ListBanner';
import ListBody from './ListBody';
import ListProject from '../ListPart/ListProject'
// import { WrapperContext } from '../index'

// const Container = styled.div`
//   grid-area: list;
//   border-right: 1px solid rgba(0, 0, 0, .2);
// `;

// const WrapListTask = styled.div`
//   display: ${props => props.show === true ? 'block' : 'none'};
//   height: calc(76vh);
//   grid-template-rows: 165px calc(76vh);
//   grid-template-columns: 1fr;
//   grid-template-areas: 
//     "header"
//     "body";
// `
// const Header = styled.div`
//   grid-area: header;
//   position: -webkit-sticky; /* Safari */
//   position: sticky;
//   top: 0px;
//   background-color: #fff;
//   z-index: 999;
// `;
function ListTask(props) {
  // const value = React.useContext(WrapperContext)
  return (
    <div {...props} className={"wrap-list-task " + (props.show === true ? "wlt-block" : "wlt-none") }>
        <div className="wlt-header">
          <ListHeader {...props} />
          <ListBanner />
        </div>
        <ListBody/>
    </div>

  )
}

function ListPart() {
  const [showListProject, setShow] = React.useState(false)

  return (
    <div className="container-lp">
      <ListTask show={!showListProject} setShow={setShow} />
      <ListProject show={showListProject} setShow={setShow} />
    </div>
  )
}

export default ListPart;
