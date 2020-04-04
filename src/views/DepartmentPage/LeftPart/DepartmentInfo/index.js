import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { deleteRoom } from '../../../../actions/room/deleteRoom';
import AlertModal from '../../../../components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_ROOM } from '../../../../constants/events.js';
import { Routes } from '../../../../constants/routes';
import { Context as UserPageContext } from '../../index';
import CreateAndUpdateDepartmentModal from '../../Modals/CreateAndUpdateDepartment';
import { routeSelector } from '../../selectors';
import { DefaultDepartment, NormalDepartment } from './presenters';
import { roomSelector } from './selectors';

function DepartmentInfo({
  room, route,
  doDeleteRoom
}) {

  const { setDepartmentId } = React.useContext(UserPageContext);
  const { departmentId } = useParams();
  const history = useHistory();

  React.useEffect(() => {
    setDepartmentId(departmentId);
  }, [setDepartmentId, departmentId]);

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push(Routes.DEPARTMENTS);
    };

    CustomEventListener(DELETE_ROOM, historyPushHandler);

    return () => {
      CustomEventDispose(DELETE_ROOM, historyPushHandler);
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
        setCreateAndUpdateDepartmentProps(props);
        setOpenCreateAndUpdateDepartmentModal(true);
        return;
      case 'ALERT':
        setAlertProps(props);
        setOpenAlertModal(true);
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
            room={room}
            departmentId={departmentId}
            handleDeleteRoom={roomId => doDeleteRoom({ roomId })}
            handleGoBack={() => history.push(route)}
            handleOpenModal={doOpenModal}
          />
        )}
      <AlertModal
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteRoom: ({ roomId }) => dispatch(deleteRoom({ roomId }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentInfo);
