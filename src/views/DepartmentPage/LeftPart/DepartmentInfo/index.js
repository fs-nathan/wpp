import { listIcon } from 'actions/icon/listIcon';
import { detailRoom } from 'actions/room/detailRoom';
import { getUserOfRoom } from 'actions/room/getUserOfRoom';
import { CustomEventDispose, CustomEventListener, DELETE_ROOM, INVITE_USER_JOIN_GROUP, SORT_USER } from 'constants/events';
import { Routes } from 'constants/routes';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import CreateAndUpdateDepartmentModal from '../../Modals/CreateAndUpdateDepartment';
import DeleteDepartmentModal from '../../Modals/DeleteDepartment';
import { routeSelector, viewPermissionsSelector } from '../../selectors';
import { DefaultDepartment, NormalDepartment } from './presenters';
import { roomSelector } from './selectors';

function DepartmentInfo({
  room, route, viewPermissions,
  doGetUserOfRoom,
  doDetailRoom,
  doListIcon,
}) {

  const [id, setId] = React.useState(null);
  const { departmentId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    setId(departmentId);
  }, [departmentId]);

  React.useEffect(() => {
    if (id !== null && id !== 'default') {
      doDetailRoom({ roomId: id });
    }
    // eslint-disable-next-line
  }, [id]);

  React.useEffect(() => {
    if (id !== null) {
      doGetUserOfRoom({ roomId: id });
      const reloadGetUserOfRoom = () => {
        doGetUserOfRoom({ roomId: id });
      }
      CustomEventListener(SORT_USER, reloadGetUserOfRoom);
      CustomEventListener(INVITE_USER_JOIN_GROUP, reloadGetUserOfRoom);
      return () => {
        CustomEventDispose(SORT_USER, reloadGetUserOfRoom);
        CustomEventDispose(INVITE_USER_JOIN_GROUP, reloadGetUserOfRoom);
      }
    }
    // eslint-disable-next-line
  }, [id]);

  React.useEffect(() => {
    doListIcon();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push(Routes.DEPARTMENTS);
    };
    CustomEventListener(DELETE_ROOM.SUCCESS, historyPushHandler);
    return () => {
      CustomEventDispose(DELETE_ROOM.SUCCESS, historyPushHandler);
    };
    //eslint-disable-next-line
  }, []);

  const [openAlertModal, setOpenAlertModal] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});
  const [openCreateAndUpdateDepartmentModal, setOpenCreateAndUpdateDepartmentModal] = React.useState(false);
  const [createAndUpdateDepartmentProps, setCreateAndUpdateDepartmentProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'UPDATE':
        if (get(viewPermissions.permissions, 'can_modify', false)) {
          setCreateAndUpdateDepartmentProps(props);
          setOpenCreateAndUpdateDepartmentModal(true);
        }
        return;
      case 'ALERT':
        if (get(viewPermissions.permissions, 'can_modify', false)) {
          setAlertProps(props);
          setOpenAlertModal(true);
        }
        return;
      default: return;
    }
  }

  return (
    <>
      {departmentId === 'default'
        ? (
          <DefaultDepartment
            handleGoBack={evt => history.push(route)}
          />
        )
        : (
          <NormalDepartment
            viewPermissions={viewPermissions}
            room={room}
            departmentId={departmentId}
            handleGoBack={() => history.push(route)}
            handleOpenModal={doOpenModal}
          />
        )}
      <DeleteDepartmentModal
        open={openAlertModal}
        setOpen={setOpenAlertModal}
        {...alertProps}
      />
      <CreateAndUpdateDepartmentModal
        open={openCreateAndUpdateDepartmentModal}
        setOpen={setOpenCreateAndUpdateDepartmentModal}
        {...createAndUpdateDepartmentProps}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    room: roomSelector(state),
    route: routeSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doGetUserOfRoom: ({ roomId }, quite) => dispatch(getUserOfRoom({ roomId }, quite)),
    doDetailRoom: ({ roomId }, quite) => dispatch(detailRoom({ roomId }, quite)),
    doListIcon: (quite) => dispatch(listIcon(quite)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentInfo);
