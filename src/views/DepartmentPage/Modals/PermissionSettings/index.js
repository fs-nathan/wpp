import { getUserOfRoom } from 'actions/room/getUserOfRoom';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import { permissionUser } from 'actions/user/permissionUser';
import { updateGroupPermissionUser } from 'actions/user/updateGroupPermissionUser';
import React from 'react';
import { connect } from 'react-redux';
import UserPermissionPresenter from './presenters';
import { bgColorSelector, permissionsSelector, updateGroupPermissionSelector } from './selectors';

function UserPermission({
  open, setOpen,
  bgColor, permissions,
  curUserId = null,
  roomId = null,
  users,
  doPermissionUser,
  doReloadUser,
  updateGroupPermission,
  doUpdateGroupPermissionUser,
}) {

  React.useEffect(() => {
    doPermissionUser();
    // eslint-disable-next-line
  }, []);

  return (
    <UserPermissionPresenter
      open={open} setOpen={setOpen} bgColor={bgColor}
      doReloadUser={() => doReloadUser(roomId)}
      curUserId={curUserId}
      roomId={roomId}
      users={users}
      permissions={permissions}
      updateGroupPermission={updateGroupPermission}
      handleUpdateGroupPermission={groupPermissionId =>
        doUpdateGroupPermissionUser({
          userId: curUserId,
          groupPermission: groupPermissionId
        })
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    permissions: permissionsSelector(state),
    updateGroupPermission: updateGroupPermissionSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadUser: (roomId) => roomId
      ? dispatch(getUserOfRoom({ roomId }, true))
      : dispatch(listUserOfGroup(true)),
    doPermissionUser: (quite) => dispatch(permissionUser(quite)),
    doUpdateGroupPermissionUser: ({ userId, groupPermission }) => dispatch(updateGroupPermissionUser({ userId, groupPermission })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPermission);
