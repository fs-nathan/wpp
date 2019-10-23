import React from 'react';
import styled from 'styled-components';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SearchInput from '../../../../components/SearchInput';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList } from '../../../../components/CustomList';
import { mdiChevronLeft } from '@mdi/js';
import CustomListItem from './CustomListItem';
import { getUserOfRoom } from '../../../../actions/room/getUserOfRoom';
import { connect } from 'react-redux';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { sortUser } from '../../../../actions/user/sortUser';
import { CustomEventListener, CustomEventDispose, SORT_USER, UPDATE_USER } from '../../../../constants/events';
import _ from 'lodash';

const Banner = styled.div`
  padding: 15px;
`;

function UserList({ getUserOfRoom, doGetUserOfRoom, sortUser, doSortUser }) {

  const { data: { users: _users }, loading: getUserOfRoomLoading, error: getUserOfRoomError } = getUserOfRoom;
  const { loading: sortUserLoading, error: sortUserError } = sortUser;
  const loading = getUserOfRoomLoading || sortUserLoading;
  const error = getUserOfRoomError || sortUserError;
  const location = useLocation();
  const history = useHistory();
  const { userId, departmentId } = useParams();
  const [searchPatern, setSearchPatern] = React.useState('');
  const users = _users.filter(user => _.get(user, 'name').includes(searchPatern));

  React.useEffect(() => {
    doGetUserOfRoom({ roomId: departmentId });
  }, [doGetUserOfRoom, departmentId]);

  React.useEffect(() => {
    const doGetUserOfRoomHandler = () => {
      doGetUserOfRoom({ roomId: departmentId });
    };

    CustomEventListener(SORT_USER, doGetUserOfRoomHandler);
    CustomEventListener(UPDATE_USER, doGetUserOfRoomHandler);

    return () => {
      CustomEventDispose(SORT_USER, doGetUserOfRoomHandler);
      CustomEventDispose(UPDATE_USER, doGetUserOfRoomHandler);
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
    <React.Fragment>
      {loading && <LoadingBox />}
      {error !== null && <ErrorBox />}
      {!loading && error === null && (
        <LeftSideContainer
          leftAction={{
            iconPath: mdiChevronLeft,
            onClick: () => history.push(`${location.pathname.replace(`/thong-tin/${departmentId}/nguoi-dung/${userId}`, '')}`),
          }}
          title='Danh sách thành viên'
        >
          <Banner>
            <SearchInput 
              value={searchPatern}
              onChange={evt => setSearchPatern(evt.target.value)}
              fullWidth 
              placeholder='Tìm thành viên'  
            />  
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
        </LeftSideContainer>
      )}
    </React.Fragment>
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
