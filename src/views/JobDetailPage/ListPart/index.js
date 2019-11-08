import React from 'react';
import styled from 'styled-components';
import ListHeader from './ListHeader';
import ListBanner from './ListBanner';
import ListBody from './ListBody';
import ListProject from '../ListPart/ListProject'

const Container = styled.div`
  grid-area: list;
  border-right: 1px solid rgba(0, 0, 0, .2);
  overflow-x: hidden;
`;

const WrapListTask = styled.div`
  display: ${props => props.show ? 'block' : 'none'};
`

function ListTask(props) {
  return (
    <WrapListTask {...props}>
      <ListHeader {...props}/>
      <ListBanner />
      <ListBody />
    </WrapListTask>
  )
}

function ListPart() {
  const [showListProject, setShow] = React.useState(false)

  return (
    <Container>
      <ListTask show={!showListProject} setShow={setShow}/>
      <ListProject show={showListProject} setShow={setShow}/>
    </Container>
  )
}

export default ListPart;
