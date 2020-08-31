import { showTab, getTaskDetailTabPart } from 'actions/taskDetail/taskDetailActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import DefaultTab from './DefaultTab';
import DemandTab from './DemandTab';
import LocationTab from './LocationTab';
import MediaTab from './MediaTab';
import MemberTab from './MemberTab';
import MemberModal from './MemberTab/MemberModal';
import OfferTab from './OfferTab';
import ProgressTab from './ProgressTab';
import RemindTab from './RemindTab';
import DetailRemind from './RemindTab/DetailRemind';
import RemindModal from './RemindTab/RemindModal';
import SubtaskTab from './SubtaskTab';
import SubTaskDetailDialog from './SubtaskTab/SubTaskDetailDialog';
import DemandDetail from './DemandTab/TabBody/DemandDetail';
import DetailOfferModal from 'views/OfferPage/views/DetailOffer/DetailOfferModal';
import { getDetailOffer, getDetailOfferLoadingState } from 'views/OfferPage/views/DetailOffer/selector';
import { setOpenDetailOffer } from 'actions/taskDetail/taskDetailActions';
import MapView from 'views/JobDetailPage/ChatComponent/MapView';

const Container = styled.div`
  grid-area: tab;
  padding: 0px;
`;

function TabPart(props) {
  const dispatch = useDispatch();
  const show = useSelector(state => state.taskDetail.detailTask.showIndex);
  const detailOffer = useSelector(state => getDetailOffer(state));
  const detailOfferLoading = useSelector(state => getDetailOfferLoadingState(state));
  const openDetail = useSelector(state => state.taskDetail.taskOffer.isOpenDetail);
  const taskId = useSelector(state => state.taskDetail.commonTaskDetail.activeTaskId);
  const locationUpdate = useSelector(state => state.taskDetail.detailTask.location);
  const [isOpenMap, setIsOpenMap] = React.useState(false);
  const [locationData, setLocationData] = React.useState({});

  useEffect(() => {
    if (locationUpdate) {
      setLocationData(locationUpdate)
      setIsOpenMap(true)
    }
  }, [locationUpdate])

  const setShow = (index) => {
    dispatch(showTab(index))
    dispatch(getTaskDetailTabPart({ taskId }));
  }

  function setOpenDetail(isOpen) {
    dispatch(setOpenDetailOffer(isOpen))
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
      <MemberModal />
      <DemandDetail />
      <DetailOfferModal
        open={openDetail}
        setOpen={setOpenDetail}
        loading={detailOfferLoading}
        {...detailOffer}
        additionQuery={`task_id=${taskId}`}
      />
      <MapView isOpen={isOpenMap} setOpen={setIsOpenMap} locationData={locationData} ></MapView>
    </Container>
  )
}

export default TabPart;
