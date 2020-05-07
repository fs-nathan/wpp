import { listLevel } from 'actions/level/listLevel';
import { listMajor } from 'actions/major/listMajor';
import { listPosition } from 'actions/position/listPosition';
import { listRoom } from 'actions/room/listRoom';
import { detailUser } from 'actions/user/detailUser';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import { updateUser } from 'actions/user/updateUser';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import UpdateUserPresenter from './presenters';
import { optionsSelector } from './selectors';

function UpdateUser({
  updatedUser = null,
  open, setOpen,
  options,
  doUpdateUser,
  doListLevel,
  doListMajor,
  doListPosition,
  doListRoom,
  doReloadUser,
}) {

  React.useEffect(() => {
    doListRoom();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListPosition();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListMajor();
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    doListLevel();
    // eslint-disable-next-line
  }, []);

  return (
    <UpdateUserPresenter
      open={open} setOpen={setOpen}
      updatedUser={updatedUser}
      options={options}
      doReloadUser={() => doReloadUser({ userId: get(updatedUser, 'id') })}
      handleUpdateUser={(userId, roomId, positionId, majorId, levelId, description) =>
        doUpdateUser({ userId, roomId, levelId, majorId, positionId, description })
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    options: optionsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doReloadUser: ({ userId }) => {
      dispatch(detailUser({ userId }, true));
      dispatch(listUserOfGroup(true));
    },
    doUpdateUser: ({ userId, roomId, levelId, majorId, positionId, description }) => dispatch(updateUser({ userId, roomId, levelId, majorId, positionId, description })),
    doListRoom: (quite) => dispatch(listRoom(quite)),
    doListPosition: (quite) => dispatch(listPosition(quite)),
    doListMajor: (quite) => dispatch(listMajor(quite)),
    doListLevel: (quite) => dispatch(listLevel(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UpdateUser);
