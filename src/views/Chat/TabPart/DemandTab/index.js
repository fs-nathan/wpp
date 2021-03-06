import { Slide } from '@material-ui/core';
import React from 'react';
import styled from 'styled-components';
import './styles.scss';
import TabBody from './TabBody';
import TabHeader from './TabHeader';

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

function DemandTab(props) {
  return (
    <Slide in={props.show === 7} mountOnEnter unmountOnExit>
      <div className="container-tabpart">
        <Header setShow={props.setShow} {...props} />
        <TabBody {...props} />
      </div>
    </Slide>
  )
}

export default DemandTab;
