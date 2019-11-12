import React from 'react';
import styled from 'styled-components';
import ListHeader from './ListHeader';
import ListBanner from './ListBanner';
import ListBody from './ListBody';
import ListProject from '../ListPart/ListProject'

const Container = styled.div`
  grid-area: list;
  border-right: 1px solid rgba(0, 0, 0, .2);
`;

const WrapListTask = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
`
const Tab = styled.div`
  height: 100%;
  display: grid;
  grid-template-rows: 165px calc(100vh - 70px - 50px);
  grid-template-columns: 1fr;
  grid-template-areas: 
    "header"
    "banner"
    "body";
`;

const Banner = styled(ListBanner)`
  grid-area: banner;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 999;
`;
const Header = styled(ListHeader)`
  grid-area: header;
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 999;
`;

function ListTask(props) {
  return (
   
      <WrapListTask {...props}>
      
          <Header {...props} />
          <Banner />
        <ListBody />
        
      </WrapListTask>
    
  )
}

function ListPart() {
  const [showListProject, setShow] = React.useState(false)

  return (
    <Container>
      <ListTask show={!showListProject} setShow={setShow} />
      <ListProject show={showListProject} setShow={setShow} />
    </Container>
  )
}

export default ListPart;
