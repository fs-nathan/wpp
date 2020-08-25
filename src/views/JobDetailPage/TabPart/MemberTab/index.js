import React from 'react';
import { Slide } from '@material-ui/core';
import TabHeader from './TabHeader';
import TabBody from './TabBody';
import styled from 'styled-components'

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
function MemberTab({ show, setShow }) {
  // const value = React.useContext(WrapperContext)

  return (
    <Slide in={show === 8}  mountOnEnter unmountOnExit>
      <div className="container-tabpart">
        <Header setShow={setShow} />
        <TabBody />
      </div>
    </Slide>
  )
}

export default MemberTab;
