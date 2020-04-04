import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { sortRoom } from '../../../../actions/room/sortRoom';
import CreateAndUpdateDepartmentModal from '../../Modals/CreateAndUpdateDepartment';
import { routeSelector } from '../../selectors';
import DepartmentListPresenter from './presenters';
import { roomsSelector } from './selectors';

function DepartmentList({
  rooms, route,
  doSortRoom,
}) {

  const [searchPatern, setSearchPatern] = React.useState('');

  const filteredRooms = filter(
    rooms.rooms,
    room => get(room, 'name', '')
      .toLowerCase()
      .includes(searchPatern.toLowerCase())
  );

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

  const [openCreateAndUpdateDepartmentModal, setOpenCreateAndUpdateDepartmentModal] = React.useState(false);

  function doOpenModal(type) {
    switch (type) {
      case 'CREATE': {
        setOpenCreateAndUpdateDepartmentModal(true);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <DepartmentListPresenter
        rooms={{
          rooms: filteredRooms,
          loading: rooms.loading,
          error: rooms.error,
        }}
        route={route}
        searchPatern={searchPatern}
        handleDragEnd={onDragEnd}
        handleSearchPatern={evt => setSearchPatern(evt.target.value)}
        handleOpenModal={doOpenModal}
      />
      <CreateAndUpdateDepartmentModal
        open={openCreateAndUpdateDepartmentModal}
        setOpen={setOpenCreateAndUpdateDepartmentModal}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    rooms: roomsSelector(state),
    route: routeSelector(state),
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
