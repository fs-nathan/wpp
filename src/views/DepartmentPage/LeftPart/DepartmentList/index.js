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
import { sortRoom } from '../../../../actions/room/sortRoom';
import { filter, get } from 'lodash';

const Banner = styled.div`
  padding: 15px;
`;

const StyledPrimary = styled(Primary)`
  font-weight: 500;
`;

function DepartmentList({ listRoom, doSortRoom, }) {

  const [openModal, setOpenModal] = React.useState(false);
  const location = useLocation(); 
  const { data: { rooms: _rooms }, loading: listRoomLoading, error } = listRoom;
  const loading = listRoomLoading;
  const [searchPatern, setSearchPatern] = React.useState('');

  const rooms = filter(_rooms, room => get(room, 'name', '').toLowerCase().includes(searchPatern.toLowerCase()));

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
      {error !== null && <ErrorBox />}
      {error === null && (
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
          loading={{
            bool: loading,
            component: () => <LoadingBox />,
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
                        <StyledPrimary>Tất cả</StyledPrimary>  
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
                        <StyledPrimary>Mặc định</StyledPrimary>  
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
  )
}

const mapStateToProps = state => {
  return {
    listRoom: state.room.listRoom,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSortRoom: ({ roomId, sortIndex }) => dispatch(sortRoom({ roomId, sortIndex })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentList);
