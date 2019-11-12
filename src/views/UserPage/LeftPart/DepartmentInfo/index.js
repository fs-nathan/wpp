import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { useParams, useHistory } from 'react-router-dom';
import ColorTypo from '../../../../components/ColorTypo';
import ColorTextField from '../../../../components/ColorTextField';
import ColorButton from '../../../../components/ColorButton';
import CustomAvatar from '../../../../components/CustomAvatar';
import { mdiChevronLeft } from '@mdi/js';
import { connect } from 'react-redux';
import { detailRoom } from '../../../../actions/room/detailRoom';
import { deleteRoom } from '../../../../actions/room/deleteRoom';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventListener, CustomEventDispose, DELETE_ROOM, UPDATE_ROOM } from '../../../../constants/events.js';
import CreateDepartment from '../../Modals/CreateDepartment';
import avatar from '../../../../assets/avatar.jpg';
import * as routes from '../../../../constants/routes'

const Container = styled.div`
  padding: 0 16px;
  height: 100%;
  display: grid;
  grid-template-rows: 1fr max-content;
  grid-template-columns: auto; 
`;

const LogoBox = styled.div`
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  & > *:not(:last-child) {
    margin-bottom: 5px;
  }
`;

const IntroBox = styled.div`
  flex-grow: 1;
`;

const ActionBox = styled.div`
  margin-top: 8px;
  padding: 8px 0 16px 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  & > * {
    text-transform: none;
    justify-content: flex-start;
    & > span:last-child {
      display: none;
    }
    background-color: #fff;
    &:hover {
      background-color: #fff;
    }
  }
`;

function DefaultDepartment({ subSlide, handleSubSlide, subSlideComp: SubSlideComp }) {
  
  const history = useHistory();

  return (
    <React.Fragment>
      {subSlide && <SubSlideComp handleSubSlide={handleSubSlide} />}
      {!subSlide && (
        <LeftSideContainer
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push(routes.member)
          }}
          title='Chi tiết bộ phận'
        >
          <LogoBox>
            <CustomAvatar style={{ width: 60, height: 60 }} alt='avatar' />
            <ColorTypo uppercase bold color='green' variant='h6'>
              Mặc định
            </ColorTypo>
          </LogoBox>
        </LeftSideContainer>
      )}
    </React.Fragment>
  );
}

function NormalDepartment({ detailRoom, doDetailRoom, deleteRoom, doDeleteRoom, subSlide, handleSubSlide, subSlideComp: SubSlideComp }) {
  
  const { departmentId } = useParams();
  const history = useHistory();
  const { data: { room }, error, loading } = detailRoom;
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);
  const [alert, setAlert] = React.useState(false);

  React.useEffect(() => {
    doDetailRoom({ roomId: departmentId });
  }, [departmentId, doDetailRoom]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push(routes.member);
    };
    const doDetailRoomHandler = () => {
      doDetailRoom({ roomId: departmentId }, true);
    };

    CustomEventListener(DELETE_ROOM, historyPushHandler);
    CustomEventListener(UPDATE_ROOM, doDetailRoomHandler);
    
    return () => {
      CustomEventDispose(DELETE_ROOM, historyPushHandler);
      CustomEventDispose(UPDATE_ROOM, doDetailRoomHandler);
    };
  }, [history, departmentId, doDetailRoom]);

  function handleDeleteDepartment(departmentId) {
    doDeleteRoom({ 
      roomId: departmentId,
    });
  }
  
  return (
    <React.Fragment>
      {subSlide && <SubSlideComp handleSubSlide={handleSubSlide} />}
      {!subSlide && (
        <React.Fragment>
          {loading && (<LoadingBox />)}
          {error !== null && (<ErrorBox />)}
          {!loading && error === null && (
            <LeftSideContainer
              leftAction={{
                iconPath: mdiChevronLeft,
                onClick: () => history.push(routes.member)
              }}
              title='Chi tiết bộ phận'
            >
              <Container>
                <div>
                  <LogoBox>
                    <CustomAvatar style={{ width: 60, height: 60 }} src={_.get(room, 'icon')} alt='avatar' />
                    <ColorTypo uppercase bold color='green' variant='h6'>
                      {_.get(room, 'name', '')}
                    </ColorTypo>
                    <ColorTypo>
                      Số nhân sự: {_.get(room, 'number_member', '')} thành viên
                    </ColorTypo>
                  </LogoBox>
                  <ColorTypo uppercase bold color='gray'>
                    Giới thiệu
                  </ColorTypo>
                  <IntroBox>
                    <ColorTextField
                      value={_.get(room, 'description', '')}  
                    />
                  </IntroBox>
                </div>
                <ActionBox>
                  <ColorButton onClick={() => setOpenUpdateModal(true)} variant='text' size='small' fullWidth>Chỉnh sửa</ColorButton>
                  <ColorButton onClick={() => setAlert(true)} variant='text' variantColor='red' size='small' fullWidth>Xóa bộ phận</ColorButton>
                </ActionBox>
              </Container>
              <CreateDepartment updateDepartment={room} open={openUpdateModal} setOpen={setOpenUpdateModal} />
              <AlertModal
                open={alert}
                setOpen={setAlert}
                content='Bạn chắc chắn muốn xóa?'
                onConfirm={() => handleDeleteDepartment(departmentId)}
              />
            </LeftSideContainer>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

function DepartmentInfo({ ...rest }) {  
  const { departmentId } = useParams();
  if (departmentId === 'default') {
    return <DefaultDepartment {...rest} />;
  } else {
    return <NormalDepartment {...rest} />
  }
}

const mapStateToProps = state => {
  return {
    detailRoom: state.room.detailRoom,
    deleteRoom: state.room.deleteRoom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDetailRoom: ({ roomId }, quite) => dispatch(detailRoom({ roomId }, quite)),
    doDeleteRoom: ({ roomId }) => dispatch(deleteRoom({ roomId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentInfo);
