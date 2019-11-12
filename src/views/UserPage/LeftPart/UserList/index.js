import React from 'react';
import styled from 'styled-components';
import { useLocation, useParams, useHistory } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SearchInput from '../../../../components/SearchInput';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem } from '../../../../components/CustomList';
import { mdiChevronLeft } from '@mdi/js';
import CustomListItem from './CustomListItem';
import { listUserOfGroup } from '../../../../actions/user/listUserOfGroup';
import { connect } from 'react-redux';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { sortUser } from '../../../../actions/user/sortUser';
import { CustomEventListener, CustomEventDispose, SORT_USER, UPDATE_USER } from '../../../../constants/events';
import { get } from 'lodash';
import * as routes from '../../../../constants/routes'

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

function UserList({ listUserOfGroup, doListUserOfGroup, sortUser, doSortUser, }) {
  
  const { data: { rooms }, loading: listUserOfGroupLoading, error: listUserOfGroupError } = listUserOfGroup;
  const { loading: sortUserLoading, error: sortUserError } = sortUser;
  const loading = listUserOfGroupLoading || sortUserLoading;
  const error = listUserOfGroupError || sortUserError;
  const location = useLocation();
  const history = useHistory();
  const { userId } = useParams();
  const [searchPatern, setSearchPatern] = React.useState('');

  React.useEffect(() => {
    doListUserOfGroup();
  }, [doListUserOfGroup]);

  React.useEffect(() => {
    const doListUserOfGroupHandler = () => {
      doListUserOfGroup();
    };

    CustomEventListener(SORT_USER, doListUserOfGroupHandler);
    CustomEventListener(UPDATE_USER, doListUserOfGroupHandler);

    return () => {
      CustomEventDispose(SORT_USER, doListUserOfGroupHandler);
      CustomEventDispose(UPDATE_USER, doListUserOfGroupHandler);
    }
  }, [doListUserOfGroup]);


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
            onClick: () => history.push(`${location.pathname.replace(`${routes.user + '/' + userId}`, '')}`),
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
                            <CustomListItem key={index} user={user} index={index} />  
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
    </React.Fragment>
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
    doListUserOfGroup: () => dispatch(listUserOfGroup()),
    doSortUser: ({ userId, roomId, sortIndex }) => dispatch(sortUser({ userId, roomId, sortIndex })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserList);
