import React from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import AlertModal from '../../../../components/AlertModal';
import CreateAndUpdateDepartmentModal from '../../Modals/CreateAndUpdateDepartment';
import { deleteRoom } from '../../../../actions/room/deleteRoom';
import {
  CustomEventListener,
  CustomEventDispose,
  DELETE_ROOM
} from '../../../../constants/events.js';
import { Context as UserPageContext } from '../../index';
import { roomSelector } from './selectors';
import { DefaultDepartment, NormalDepartment, } from './presenters';

function DepartmentInfo({ 
  room, 
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
      doGoBack();
    };

    CustomEventListener(DELETE_ROOM, historyPushHandler);

    return () => {
      CustomEventDispose(DELETE_ROOM, historyPushHandler);
    };
  }, [doGoBack]);

  function doGoBack() {
    history.push('/departments');
  }

  const [openAlertModal, setOpenAlertModal] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});
  const [openCreateAndUpdateDepartmentModal, setOpenCreateAndUpdateDepartmentModal] = React.useState(false);
  const [createAndUpdateDepartmentProps, setCreateAndUpdateDepartmentProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'UPDATE': {
        setCreateAndUpdateDepartmentProps(props);
        setOpenCreateAndUpdateDepartmentModal(true);
        return;
      };
      case 'ALERT': {
        setAlertProps(props);
        setOpenAlertModal(true);
        return;
      };
      default: return;
    }
  }

  return (
    <>
      {departmentId === 'default' 
        ? (
          <DefaultDepartment 
            handleGoBack={doGoBack}
          />
        )
        : (
          <NormalDepartment
            room={room}
            departmentId={departmentId}
            handleDeleteRoom={roomId => doDeleteRoom({ roomId })}
            handleGoBack={doGoBack}
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
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteRoom: ({ roomId }) => dispatch(deleteRoom({ roomId }))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DepartmentInfo);
