import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import styled from 'styled-components'

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

function LocationTab({ show, setShow }) {
  return (
    <Slide in={show === 5} mountOnEnter unmountOnExit>
      <div className="container-tabpart">
        <Header setShow={setShow} />
        <TabBody />
      </div>
    </Slide>
  )
}

export default LocationTab;
