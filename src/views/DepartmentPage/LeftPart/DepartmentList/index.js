import { listIcon } from 'actions/icon/listIcon';
import { listRoom } from 'actions/room/listRoom';
import { sortRoom } from 'actions/room/sortRoom';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import { ACCEPT_REQUIREMENT_USER_JOIN_GROUP, CustomEventDispose, CustomEventListener, INVITE_USER_JOIN_GROUP, SORT_ROOM, SORT_USER } from 'constants/events';
import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import CreateAndUpdateDepartmentModal from '../../Modals/CreateAndUpdateDepartment';
import CreateAccountModal from '../../Modals/CreateAccount';
import { actionVisibleDrawerMessage } from 'actions/system/system';
import { routeSelector, viewPermissionsSelector } from '../../selectors';
import DepartmentListPresenter from './presenters';
import { roomsSelector } from './selectors';
import AddMemberModal from "../../../JobDetailPage/ListPart/ListHeader/AddMemberModal";
import AddUserModal from "../../Modals/AddUserModal";

function DepartmentList({
  rooms, route, viewPermissions,
  doSortRoom,
  doListIcon,
  doListRoom,
  doListUserOfGroup,
  doActionVisibleDrawerMessage,
}) {

  React.useEffect(() => {
    doListIcon();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListRoom();
    const reloadListRoom = () => {
      doListRoom();
    }
    CustomEventListener(SORT_ROOM, reloadListRoom);
    return () => {
      CustomEventDispose(SORT_ROOM, reloadListRoom);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListUserOfGroup();
    const reloadListUserOfGroup = () => {
      doListUserOfGroup();
    }
    CustomEventListener(SORT_ROOM, reloadListUserOfGroup);
    CustomEventListener(SORT_USER, reloadListUserOfGroup);
    CustomEventListener(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
    CustomEventListener(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, reloadListUserOfGroup);
    return () => {
      CustomEventDispose(SORT_ROOM, reloadListUserOfGroup);
      CustomEventDispose(SORT_USER, reloadListUserOfGroup);
      CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadListUserOfGroup);
      CustomEventDispose(ACCEPT_REQUIREMENT_USER_JOIN_GROUP, reloadListUserOfGroup);
    }
    // eslint-disable-next-line
  }, []);

  const [searchPatern, setSearchPatern] = React.useState('');
  const [filteredRooms, setFilteredRooms] = React.useState([]);

  React.useEffect(() => {
    setFilteredRooms(filter(
      rooms.rooms,
      room => get(room, 'name', '')
        .toLowerCase()
        .includes(searchPatern.toLowerCase())
    ));
    // eslint-disable-next-line
  }, [searchPatern, rooms]);

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
  const [openCreateAccountModal, setOpenCreateAccountModal] = React.useState(false);
  const [openAddUSerModal, setOpenAddUserModal] = React.useState(false);

  function doOpenModal(type) {
    switch (type) {
      case 'CREATE': {
        if (get(viewPermissions.permissions, 'can_modify', false)) {
          setOpenCreateAndUpdateDepartmentModal(true);
        }
        return;
      }
      case 'CREATE_ACCOUNT': {
        if (get(viewPermissions.permissions, 'can_modify', false)) {
          setOpenCreateAccountModal(true);
        }
        return;
      }
      case 'MEMBERS-REQUIRED': {
        if (get(viewPermissions.permissions, 'can_modify', false)) {
          setOpenCreateAccountModal(true);
        }
        return;
      }
      case 'ADD_USER':
        setOpenAddUserModal(true);
        return;
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
        viewPermissions={viewPermissions}
        searchPatern={searchPatern}
        handleDragEnd={onDragEnd}
        handleSearchPatern={evt => setSearchPatern(evt.target.value)}
        handleOpenModal={doOpenModal}
        handleVisibleDrawerMessage={doActionVisibleDrawerMessage}
      />
      <CreateAndUpdateDepartmentModal
        open={openCreateAndUpdateDepartmentModal}
        setOpen={setOpenCreateAndUpdateDepartmentModal}
      />
      <CreateAccountModal open={openCreateAccountModal} setOpen={setOpenCreateAccountModal} />
      <AddUserModal setOpen={setOpenAddUserModal} open={openAddUSerModal}/>
    </>
  )
}

const mapStateToProps = state => {
  return {
    viewPermissions: viewPermissionsSelector(state),
    rooms: roomsSelector(state),
    route: routeSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doSortRoom: ({ roomId, sortIndex }) => dispatch(sortRoom({ roomId, sortIndex })),
    doListIcon: (quite) => dispatch(listIcon(quite)),
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doListUserOfGroup: (quite) => dispatch(listUserOfGroup(quite)),
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DepartmentList);
