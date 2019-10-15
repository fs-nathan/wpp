import React from 'react';
import _ from 'lodash';
import styled from 'styled-components';
import { Link, useParams, useHistory } from 'react-router-dom';
import ColorTypo from '../../../../components/ColorTypo';
import ColorButton from '../../../../components/ColorButton';
import { IconButton, Avatar } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import { connect } from 'react-redux';
import { detailRoom } from '../../../../actions/room/detailRoom';
import { deleteRoom } from '../../../../actions/room/deleteRoom';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { CustomEventListener, CustomEventDispose, DELETE_ROOM, UPDATE_ROOM } from '../../../../constants/events.js';
import CreateDepartment from '../../Modals/CreateDepartment';
import avatar from '../../../../assets/avatar.jpg';
 
const Container = styled.div`
  border-right: 1px solid rgba(0, 0, 0, .2);
  padding: 15px;
  & > *:not(:last-child) {
    padding-bottom: 15px;
  }
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 10px;
  }
  border-bottom: 1px solid rgba(0, 0, 0, .1);
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0px;
  background-color: #fff;
  z-index: 10;
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
  & > hr {
    border: 1px solid rgba(0, 0, 0, .1);
  }
  & > * {
    text-transform: none;
    justify-content: flex-start;
  }
`;

function DefaultDepartment({ subSlide, handleSubSlide, subSlideComp: SubSlideComp }) {
  return (
    <React.Fragment>
      {subSlide && <SubSlideComp handleSubSlide={handleSubSlide} />}
      {!subSlide && (
        <Container>
          <Header>
            <IconButton component={Link} to='/thanh-vien'>
              <Icon path={mdiChevronLeft} size={1} />
            </IconButton>
            <ColorTypo uppercase>Chi tiết phòng ban</ColorTypo>
          </Header>
          <LogoBox>
            <Avatar style={{ width: 60, height: 60 }} src={avatar} alt='avatar' />
            <ColorTypo uppercase bold color='green' variant='h6'>
              Mặc định
            </ColorTypo>
          </LogoBox>
        </Container>
      )}
    </React.Fragment>
  );
}

function NormalDepartment({ detailRoom, doDetailRoom, deleteRoom, doDeleteRoom, subSlide, handleSubSlide, subSlideComp: SubSlideComp }) {
  
  const { departmentId } = useParams();
  const history = useHistory();
  const { data: { room }, error, loading } = detailRoom;
  const [openUpdateModal, setOpenUpdateModal] = React.useState(false);

  React.useEffect(() => {
    doDetailRoom({ roomId: departmentId });
  }, [departmentId, doDetailRoom]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push('/thanh-vien');
    };
    const doDetailRoomHandler = () => {
      doDetailRoom({ roomId: departmentId });
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
        <Container>
          {loading && (<LoadingBox />)}
          {error !== null && (<ErrorBox />)}
          {!loading && error === null && (
            <React.Fragment>
              <Header>
                <IconButton component={Link} to='/thanh-vien'>
                  <Icon path={mdiChevronLeft} size={1} />
                </IconButton>
                <ColorTypo uppercase>Chi tiết phòng ban</ColorTypo>
              </Header>
              <LogoBox>
                <Avatar style={{ width: 60, height: 60 }} src={_.get(room, 'icon')} alt='avatar' />
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
                <ColorTypo>
                  {_.get(room, 'description', '')}  
                </ColorTypo>
              </IntroBox>
              <ActionBox>
                <ColorButton onClick={() => setOpenUpdateModal(true)} variant='text' size='small' fullWidth>Chỉnh sửa</ColorButton>
                <hr />
                <ColorButton onClick={() => handleDeleteDepartment(departmentId)} variant='text' variantColor='red' size='small' fullWidth>Xóa Phòng/Ban/Nhóm</ColorButton>
              </ActionBox>
              <CreateDepartment updateDepartment={room} open={openUpdateModal} setOpen={setOpenUpdateModal} />
            </React.Fragment>
          )}
        </Container>
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
    doDetailRoom: ({ roomId }) => dispatch(detailRoom({ roomId })),
    doDeleteRoom: ({ roomId }) => dispatch(deleteRoom({ roomId })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentInfo);
