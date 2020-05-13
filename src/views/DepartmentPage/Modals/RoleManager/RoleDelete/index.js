import { deleteUserRole } from 'actions/userRole/deleteUserRole';
import { listUserRole } from 'actions/userRole/listUserRole';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import UserRoleDeletePresenter from './presenters';

function UserRoleCreateAndUpdate({
  selectedUserRole = null,
  open, setOpen,
  doDeleteUserRole,
  doReloadUserRole,
}) {

  return (
    <UserRoleDeletePresenter
      doReloadUserRole={doReloadUserRole}
      open={open} setOpen={setOpen}
      handleDeleteUserRole={() =>
        doDeleteUserRole({
          userRoleId: get(selectedUserRole, 'id'),
        })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadUserRole: () => dispatch(listUserRole(true)),
    doDeleteUserRole: ({ userRoleId }) => dispatch(deleteUserRole({ userRoleId })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(UserRoleCreateAndUpdate);
