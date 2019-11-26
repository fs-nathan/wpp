import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { mdiChevronLeft } from '@mdi/js';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SearchInput from '../../../../components/SearchInput';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem } from '../../../../components/CustomList';
import CustomListItem from './CustomListItem';
import { listUserOfGroup } from '../../../../actions/user/listUserOfGroup';
import { connect } from 'react-redux';
import ErrorBox from '../../../../components/ErrorBox';
import LoadingBox from '../../../../components/LoadingBox';
import { sortUser } from '../../../../actions/user/sortUser';
import { get } from 'lodash';

const Banner = styled.div`
  padding: 15px;
`;

const CustomStyledList = styled(StyledList)`
  && {
    padding: 0;
  }
  && > li:hover {
    background: rgba(0, 0, 0, 0);
  }
  &&:nth-child(2) {
    padding: 8px 0;
  }
`;

const RoomNameSpan = styled.span`
  text-transform: uppercase;
  font-weight: bold;
  color: #9c9c9c;
  padding: 15px;
`;

function UserList({ listUserOfGroup, sortUser, doSortUser, }) {
  
  const { data: { rooms }, loading: listUserOfGroupLoading, error: listUserOfGroupError } = listUserOfGroup;
  const { loading: sortUserLoading, error: sortUserError } = sortUser;
  const loading = listUserOfGroupLoading || sortUserLoading;
  const error = listUserOfGroupError || sortUserError;
  const history = useHistory();
  const [searchPatern, setSearchPatern] = React.useState('');

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

  function handleLink(userId) {
    history.push(`/members/${userId}`);
  }

  return (
    <>
    {error !== null && <ErrorBox />}
    {error === null && (
      <LeftSideContainer
        title='Danh sách thành viên'
        loading={{
          bool: loading,
          component: () => <LoadingBox />
        }}
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
          {rooms.map((room, index) => {
            const users = get(room, 'users', []);
            return (
              <Droppable key={index} droppableId={get(room, 'id')}>
                {provided => (
                  <CustomStyledList
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                  >
                    <StyledListItem>
                      <RoomNameSpan>
                        {get(room, 'name', '') === 'default' ? 'Mặc định' : get(room, 'name', '')}
                      </RoomNameSpan>
                    </StyledListItem>
                    {users.map((user, index) => {
                      if (get(user, 'name', '').toLowerCase().includes(searchPatern.toLowerCase()))
                        return (
                          <CustomListItem key={index} user={user} index={index} handleLink={handleLink} />  
                        );
                      else 
                        return null;
                    })}
                    {provided.placeholder}
                  </CustomStyledList>
                )}
              </Droppable>
            );
          })}
        </DragDropContext>
      </LeftSideContainer>
    )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    listUserOfGroup: state.user.listUserOfGroup,
    sortUser: state.user.sortUser,
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
    doSortUser: ({ userId, roomId, sortIndex }) => dispatch(sortUser({ userId, roomId, sortIndex })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);