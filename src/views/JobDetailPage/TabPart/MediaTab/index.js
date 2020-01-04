import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import styled from 'styled-components'

<<<<<<< HEAD
// const Container = styled.div`
//   transition: unset !important;
//   height: 100%;
//   display: grid;
//   grid-template-rows: 85px calc(85vh);
//   grid-template-columns: 1fr;
//   grid-template-areas: 
//     "header"
//     "body";
// `
=======
const Container = styled.div`
  transition: unset !important;
  height: 100%;
  display: grid;
  grid-template-rows: 85px calc(85vh);
  grid-template-columns: 1fr;
  grid-template-areas: 
    "header"
    "body";
`
>>>>>>> origin/ManhHoang
const Header = styled(TabHeader)`
  grid-area: header;
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 999;
`
function MediaTab(props) {
  return (
    <Slide in={props.show === 4}  mountOnEnter unmountOnExit>
<<<<<<< HEAD
      <div className="container-tabpart">
=======
      <Container>
>>>>>>> origin/ManhHoang
        <Header setShow={props.setShow} />
        <TabBody {...props}/>
      </div>
    </Slide>
  )
}

export default MediaTab;
