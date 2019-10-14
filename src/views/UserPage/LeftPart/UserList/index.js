import React from 'react';
import styled from 'styled-components';
import { Link, useLocation, useParams } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';
import { IconButton, List } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiChevronLeft } from '@mdi/js';
import CustomListItem from './CustomListItem';
import { getUserOfRoom } from '../../../../actions/room/getUserOfRoom';
import { connect } from 'react-redux';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { sortUser } from '../../../../actions/user/sortUser';
import { CustomEventListener, CustomEventDispose, SORT_USER } from '../../../../constants/events';

const Container = styled.div`
  grid-area: left;
  border-right: 1px solid rgba(0, 0, 0, .2);
`;

const Header = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  & > *:not(:first-child) {
    margin-left: 10px;
  }
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const Banner = styled.div`
  padding: 15px;
`;

const StyledList = styled(List)`
  padding: 8px 0;
`;

function UserList({ getUserOfRoom, doGetUserOfRoom, sortUser, doSortUser }) {

  const { data: { users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;
  const { loading: sortUserLoading, error: sortUserError } = sortUser;
  const loading = getUserOfRoomLoading || sortUserLoading;
  const error = getUserOfRoomError || sortUserError;
  const location = useLocation();
  const { userId, departmentId } = useParams();

  React.useEffect(() => {
    doGetUserOfRoom({ roomId: departmentId });
  }, [doGetUserOfRoom, departmentId]);

  React.useEffect(() => {
    const doGetUserOfRoomHandler = () => {
      doGetUserOfRoom({ roomId: departmentId });
    };

    CustomEventListener(SORT_USER, doGetUserOfRoomHandler);

    return () => {
      CustomEventDispose(SORT_USER, doGetUserOfRoomHandler);
    }
  }, [doGetUserOfRoom, departmentId]);


  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    doSortUser({
      userId: draggableId,
      roomId: destination.droppableId,
      sortIndex: destination.index,
    });
  }

  return (
    <Container>
      {loading && <LoadingBox />}
      {error !== null && <ErrorBox />}
      {!loading && error === null && (
        <React.Fragment>
          <Header>
            <IconButton component={Link} to={`${location.pathname.replace(`/thong-tin/${departmentId}/nguoi-dung/${userId}`, '')}`}> 
              <Icon path={mdiChevronLeft} size={1} />
            </IconButton>
            <ColorTypo uppercase>Danh sách Thành viên</ColorTypo>
          </Header>
          <Banner>
            <SearchInput fullWidth placeholder='Tìm thành viên'/>  
          </Banner>
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={departmentId}>
              {provided => (
                <StyledList
                  innerRef={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {users.map((user, index) => (
                    <CustomListItem key={index} user={user} index={index} />  
                  ))}
                  {provided.placeholder}
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
        </React.Fragment>
      )}
    </Container>
  )
}

const mapStateToProps = state => {
  return {
    getUserOfRoom: state.room.getUserOfRoom,
    sortUser: state.user.sortUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doGetUserOfRoom: ({ roomId }) => dispatch(getUserOfRoom({ roomId })),
    doSortUser: ({ userId, roomId, sortIndex }) => dispatch(sortUser({ userId, roomId, sortIndex })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
