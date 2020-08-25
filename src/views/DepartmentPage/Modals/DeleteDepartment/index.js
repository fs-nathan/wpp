import { deleteRoom } from 'actions/room/deleteRoom';
import { listRoom } from 'actions/room/listRoom';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import DeleteDepartmentPresenter from './presenters';

function RoomCreateAndUpdate({
  selectedRoom = null,
  open, setOpen,
  doDeleteRoom,
  doReloadRoom,
}) {

  return (
    <DeleteDepartmentPresenter
      doReloadRoom={doReloadRoom}
      open={open} setOpen={setOpen}
      handleDeleteRoom={() =>
        doDeleteRoom({
          roomId: get(selectedRoom, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadRoom: () => dispatch(listRoom(true)),
    doDeleteRoom: ({ roomId }) => dispatch(deleteRoom({ roomId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(RoomCreateAndUpdate);
