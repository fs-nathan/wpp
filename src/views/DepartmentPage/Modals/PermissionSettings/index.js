import { getUserOfRoom } from 'actions/room/getUserOfRoom';
import { listUserOfGroup } from 'actions/user/listUserOfGroup';
import { permissionUser } from 'actions/user/permissionUser';
import { removeGroupPermissionUser } from 'actions/user/removeGroupPermissionUser';
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
  doRemoveGroupPermissionUser,
}) {

  React.useEffect(() => {
    if(open) doPermissionUser();
  }, [open]);

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
        groupPermissionId
          ? doUpdateGroupPermissionUser({
            userId: curUserId,
            groupPermission: groupPermissionId
          })
          : doRemoveGroupPermissionUser({
            userId: curUserId
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
    doRemoveGroupPermissionUser: ({ userId }) => dispatch(removeGroupPermissionUser({ userId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPermission);
