import React from 'react';
import styled from 'styled-components';
import DefaultTab from './DefaultTab';
import ProgressTab from './ProgressTab';
import SubtaskTab from './SubtaskTab';
import RemindTab from './RemindTab';
import MediaTab from './MediaTab';
import LocationTab from './LocationTab';
import OfferTab from './OfferTab';
import DemandTab from './DemandTab';
import MemberTab from './MemberTab';

const Container = styled.div`
  grid-area: tab;
  padding: 0px;
`;

function TabPart(props) {

  const [show, setShow] = React.useState(0);

  return (
    <Container>
      <DefaultTab show={show} setShow={setShow} />
      <ProgressTab show={show} setShow={setShow} />
      <SubtaskTab show={show} setShow={setShow} {...props} />
      <RemindTab show={show} setShow={setShow} {...props}/>
      <MediaTab show={show} setShow={setShow} />
      <LocationTab show={show} setShow={setShow} />
      <OfferTab show={show} setShow={setShow} {...props}/>
      <DemandTab show={show} setShow={setShow} {...props}/>
      <MemberTab show={show} setShow={setShow} />
    </Container>
  )
}

export default TabPart;
