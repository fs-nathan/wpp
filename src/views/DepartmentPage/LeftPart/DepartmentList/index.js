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
import AddUserModal from "../../Modals/AddUserModal";
import {hasRequirementSelector} from "../../RightPart/AllUsersTable/selectors";
import ModalCreateAccount from 'components/CustomTable/Modal/create-account';
import ModalOptionCreateAccount from 'components/CustomTable/Modal/optionCreateAccount';
import ModalContinueCreateAccount from 'components/CustomTable/Modal/continue-create-account';
import ModalUplaodExcel from 'components/CustomTable/Modal/uploadExcel';
import ModalResultCreateAccount from 'components/CustomTable/Modal/result-create-account';

function DepartmentList({
  rooms, route, viewPermissions,
  doSortRoom,
  doListIcon,
  doListRoom,
  doListUserOfGroup,
  doActionVisibleDrawerMessage,
  countRequirements
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
  const [open,setOpen] = React.useState(false)
  const [openCreateAccount,setOpenCreateAccount] = React.useState(false);
  
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
  const [openContinueCreateAccount,setOpenContinueCreateAccount] = React.useState(false);
  const [openUploadExcel, setOpenUploadExcel] = React.useState(false);
  const [result,setResult] = React.useState(null);
  const [openResultCreateAccount, setOpenResultCreateAccount] = React.useState(false);

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
        route={route} countRequirements={countRequirements}
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
      <ModalCreateAccount setOpenAddMember={setOpenAddUserModal} openAddMember={openAddUSerModal} setOpen={setOpen} setOpenCreateAccount={setOpenCreateAccount} setOpenContinueCreateAccount={setOpenContinueCreateAccount}/>
      <AddUserModal setOpen={setOpen} open={open}/>
      <ModalOptionCreateAccount openCreateAccount={openCreateAccount} setOpenCreateAccount={setOpenCreateAccount} setOpenContinueCreateAccount={setOpenContinueCreateAccount}/>
      <ModalContinueCreateAccount  setResult={setResult} setOpenResultCreateAccount={setOpenResultCreateAccount}  openContinueCreateAccount={openContinueCreateAccount} setOpenContinueCreateAccount={setOpenContinueCreateAccount} setOpenUploadExcel={setOpenUploadExcel}/>
      <ModalUplaodExcel openUploadExcel={openUploadExcel} setOpenUploadExcel={setOpenUploadExcel} setOpenContinueCreateAccount={setOpenContinueCreateAccount}/>
      <ModalResultCreateAccount result={result} openResultCreateAccount={openResultCreateAccount} setOpenResultCreateAccount={setOpenResultCreateAccount} />

    </>
  )
}

const mapStateToProps = state => {
  return {
    viewPermissions: viewPermissionsSelector(state),
    rooms: roomsSelector(state),
    route: routeSelector(state),
    countRequirements: hasRequirementSelector(state)
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
