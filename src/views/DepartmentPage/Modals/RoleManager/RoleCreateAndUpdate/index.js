import { createUserRole } from 'actions/userRole/createUserRole';
import { listUserRole } from 'actions/userRole/listUserRole';
import { updateUserRole } from 'actions/userRole/updateUserRole';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import RoleCreateAndUpdatePresenter from './presenters';

function RoleCreateAndUpdate({
  open, setOpen,
  updatedUserRole = null,
  doCreateUserRole, doUpdateUserRole,
  doReloadUserRole,
}) {

  return (
    <RoleCreateAndUpdatePresenter
      open={open}
      setOpen={setOpen}
      doReloadUserRole={doReloadUserRole}
      updatedUserRole={updatedUserRole}
      handleCreateOrUpdateUserRole={(name, description) =>
        updatedUserRole
          ? doUpdateUserRole({
            userRoleId: get(updatedUserRole, 'id'),
            name,
            description,
          })
          : doCreateUserRole({
            name,
            description,
          })
      }
    />
  )
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadUserRole: () => dispatch(listUserRole(true)),
    doCreateUserRole: ({ name, description }) => dispatch(createUserRole({ name, description })),
    doUpdateUserRole: ({ userRoleId, name, description }) => dispatch(updateUserRole({ userRoleId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(RoleCreateAndUpdate);
