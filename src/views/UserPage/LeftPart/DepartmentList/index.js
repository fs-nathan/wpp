import React from 'react';
import styled from 'styled-components';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ColorTypo from '../../../../components/ColorTypo';
import SearchInput from '../../../../components/SearchInput';
import LoadingBox from '../../../../components/LoadingBox';
import ErrorBox from '../../../../components/ErrorBox';
import { IconButton, List, Avatar, ListItem, ListItemText } from '@material-ui/core';
import Icon from '@mdi/react';
import { mdiPlus, mdiDrag, mdiDragVertical } from '@mdi/js';
import CustomListItem from './CustomListItem';
import CreateDepartmentModal from '../../Modals/CreateDepartment';
import { connect } from 'react-redux';
import { listRoom } from '../../../../actions/room/listRoom';
import { sortRoom } from '../../../../actions/room/sortRoom';
import { CustomEventListener, CustomEventDispose, CREATE_ROOM, SORT_ROOM } from '../../../../constants/events';
import avatar from '../../../../assets/avatar.jpg';
import _ from 'lodash';

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
    &:last-child {
      margin-left: auto;
    }
  }
  border-bottom: 1px solid rgba(0, 0, 0, .1);
`;

const Banner = styled.div`
  padding: 15px;
`;

const StyledList = styled(List)`
  padding: 8px 0;
`;

const StyledListItem = styled(ListItem)`
  display: flex;
  align-items: center;
  padding: 10px;
  background-color: #fff;
  & > *:not(:first-child) {
    margin-left: 8px;
  }
`;

function DepartmentList({ listRoom, doListRoom, sortRoom, doSortRoom }) {

  const [openModal, setOpenModal] = React.useState(false);
  const { data: { rooms: _rooms }, loading: listRoomLoading, error: listRoomError } = listRoom;
  const { loading: sortRoomLoading, error: sortRoomError } = sortRoom;
  const [searchPatern, setSearchPatern] = React.useState('');

  const loading = listRoomLoading || sortRoomLoading;
  const error = listRoomError || sortRoomError;

  const rooms = _.filter(_rooms, room => _.get(room, 'name', '').includes(searchPatern));

  React.useEffect(() => {
    doListRoom();
  }, [doListRoom]);

  React.useEffect(() => {
    const doListRoomHandler = () => {
      doListRoom();
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
    <Container>
      {loading && <LoadingBox />}
      {(error !== null) && <ErrorBox />}
      {!loading && (error === null) && (
        <React.Fragment>
          <Header>
            <Icon path={mdiDrag} size={1} />
            <ColorTypo uppercase>Danh sách Phòng/Ban/Nhóm</ColorTypo>
            <IconButton onClick={() => setOpenModal(true)}>
              <Icon path={mdiPlus} size={1} />
            </IconButton>
          </Header>
          <Banner>
            <SearchInput 
              fullWidth 
              placeholder='Tìm Phòng/Ban/Nhóm'
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
                  <StyledListItem>
                    <div>
                      <Icon path={mdiDragVertical} size={1} color={'rgba(0, 0, 0, 0)'}/>
                    </div>
                    <Avatar src={avatar} alt='avatar' />
                    <ListItemText 
                      primary={
                        <ColorTypo component='span' bold>Tất cả</ColorTypo>  
                      }
                      secondary={
                        <ColorTypo component='small' color='green' variant='caption'>
                        {rooms.reduce((sum, room) => sum += _.get(room, 'number_member'), 0)} thành viên
                        </ColorTypo>
                      }
                    />
                  </StyledListItem>
                  {rooms.map((room, index) => (
                    <CustomListItem key={index} room={room} index={index} />  
                  ))}
                  {provided.placeholder}
                </StyledList>
              )}
            </Droppable>
          </DragDropContext>
          <CreateDepartmentModal open={openModal} setOpen={setOpenModal} />
        </React.Fragment>
      )}
    </Container>
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
    doListRoom: () => dispatch(listRoom()),
    doSortRoom: ({ roomId, sortIndex }) => dispatch(sortRoom({ roomId, sortIndex })),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentList);
