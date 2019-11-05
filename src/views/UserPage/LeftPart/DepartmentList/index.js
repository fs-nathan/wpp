import React from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import SearchInput from '../../../../components/SearchInput';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import LeftSideContainer from '../../../../components/LeftSideContainer';
import { StyledList, StyledListItem, Primary, Secondary } from '../../../../components/CustomList';
import { ListItemText } from '@material-ui/core';
import CustomAvatar from '../../../../components/CustomAvatar';
import Icon from '@mdi/react';
import { mdiPlus, mdiDrag, mdiDragVertical } from '@mdi/js';
import CustomListItem from './CustomListItem';
import CreateDepartmentModal from '../../Modals/CreateDepartment';
import { connect } from 'react-redux';
import { listRoom } from '../../../../actions/room/listRoom';
import { sortRoom } from '../../../../actions/room/sortRoom';
import { CustomEventListener, CustomEventDispose, CREATE_ROOM, SORT_ROOM } from '../../../../constants/events';
import { filter, get } from 'lodash';

const Banner = styled.div`
  padding: 15px;
`;

function DepartmentList({ listRoom, doListRoom, sortRoom, doSortRoom, subSlide, handleSubSlide, subSlideComp: SubSlideComp }) {

  const [openModal, setOpenModal] = React.useState(false);
  const location = useLocation(); 
  const { data: { rooms: _rooms }, loading: listRoomLoading, error } = listRoom;
  const loading = listRoomLoading;
  const [searchPatern, setSearchPatern] = React.useState('');

  const rooms = filter(_rooms, room => get(room, 'name', '').toLowerCase().includes(searchPatern.toLowerCase()));

  React.useEffect(() => {
    doListRoom();
  }, [doListRoom]);

  React.useEffect(() => {
    const doListRoomHandler = () => {
      doListRoom(true);
    };

    CustomEventListener(CREATE_ROOM, doListRoomHandler);
    CustomEventListener(SORT_ROOM, doListRoomHandler);

    return () => {
      CustomEventDispose(CREATE_ROOM, doListRoomHandler);
      CustomEventDispose(SORT_ROOM, doListRoomHandler);
    }
  }, [doListRoom]);

  function onDragEnd(result) {
    const { source, destination, draggableId } = result;
    if (!destination) return;
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) return;
    doSortRoom({
      roomId: draggableId,
      sortIndex: destination.index,
    })
  }

  return (
    <React.Fragment>
      {subSlide && <SubSlideComp handleSubSlide={handleSubSlide} />}
      {!subSlide && (
        <React.Fragment>
          {loading && <LoadingBox />}
          {(error !== null) && <ErrorBox />}
          {!loading && (error === null) && (
            <LeftSideContainer
              title='Danh sách bộ phận'
              leftAction={{
                iconPath: mdiDrag,
                onClick: null,
              }}
              rightAction={{
                iconPath: mdiPlus,
                onClick: () => setOpenModal(true),
              }}
            >
              <Banner>
                <SearchInput 
                  fullWidth 
                  placeholder='Tìm bộ phận'
                  value={searchPatern}
                  onChange={evt => setSearchPatern(evt.target.value)}
                />  
              </Banner>
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId={'department-list'}>
                  {provided => (
                    <StyledList
                      innerRef={provided.innerRef}
                      {...provided.droppableProps}
                    >
                      <StyledListItem
                        to={`${location.pathname}`}
                        component={Link}
                      >
                        <div>
                          <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                        </div>
                        <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                        <ListItemText 
                          primary={
                            <Primary>Tất cả</Primary>  
                          }
                          secondary={
                            <Secondary>
                              {rooms.reduce((sum, room) => sum += get(room, 'number_member'), 0)} thành viên
                            </Secondary>
                          }
                        />
                      </StyledListItem>
                      {rooms.map((room, index) => (
                        <CustomListItem key={get(room, 'id')} room={room} index={index} />  
                      ))}
                      {provided.placeholder}
                      <StyledListItem
                        component={Link}
                        to={`${location.pathname}/default`
                      }>
                        <div>
                          <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                        </div>
                        <CustomAvatar style={{ height: 50, width: 50, }} alt='avatar' />
                        <ListItemText 
                          primary={
                            <Primary>Mặc định</Primary>  
                          }
                          secondary={
                            <Secondary>
                              {rooms.reduce((sum, room) => sum += get(room, 'number_member'), 0)} thành viên
                            </Secondary>
                          }
                        />
                      </StyledListItem>
                    </StyledList>
                  )}
                </Droppable>
              </DragDropContext>
              <CreateDepartmentModal open={openModal} setOpen={setOpenModal} />
            </LeftSideContainer>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

const mapStateToProps = state => {
  return {
    listRoom: state.room.listRoom,
    sortRoom: state.room.sortRoom,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doSortRoom: ({ roomId, sortIndex }) => dispatch(sortRoom({ roomId, sortIndex })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentList);
