import { showTab } from 'actions/taskDetail/taskDetailActions';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DefaultTab from './DefaultTab';
import DemandTab from './DemandTab';
import LocationTab from './LocationTab';
import MediaTab from './MediaTab';
import MemberTab from './MemberTab';
import OfferTab from './OfferTab';
import ProgressTab from './ProgressTab';
import RemindTab from './RemindTab';
import DetailRemind from './RemindTab/DetailRemind';
import RemindModal from './RemindTab/RemindModal';
import SubtaskTab from './SubtaskTab';
import SubTaskDetailDialog from './SubtaskTab/SubTaskDetailDialog';
const Container = styled.div`
  grid-area: tab;
  padding: 0px;
`;

function TabPart(props) {
  const dispatch = useDispatch();
  const show = useSelector(state => state.taskDetail.detailTask.showIndex);

  const setShow = (index) => {
    dispatch(showTab(index))
  }

  return (
    <Container>
      <DefaultTab show={show} setShow={setShow} />
      <ProgressTab show={show} setShow={setShow} />
      <SubtaskTab show={show} setShow={setShow} {...props} />
      <RemindTab show={show} setShow={setShow} {...props} />
      <MediaTab show={show} setShow={setShow} {...props} />
      <LocationTab show={show} setShow={setShow} />
      <OfferTab show={show} setShow={setShow} {...props} />
      <DemandTab show={show} setShow={setShow} {...props} />
      <MemberTab show={show} setShow={setShow} />
      <DetailRemind />
      <RemindModal />
      <SubTaskDetailDialog />

    </Container>
  )
}

export default TabPart;
