import React from 'react';
import { createUserRole } from '../../../../../actions/userRole/createUserRole';
import { updateUserRole } from '../../../../../actions/userRole/updateUserRole';
import { connect } from 'react-redux';
import { get } from 'lodash';
import RoleCreateAndUpdatePresenter from './presenters';

function RoleCreateAndUpdate({ open, setOpen, updatedUserRole = null, doCreateUserRole, doUpdateUserRole }) {

  return (
    <RoleCreateAndUpdatePresenter
      open={open}
      setOpen={setOpen}
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
    doCreateUserRole: ({ name, description }) => dispatch(createUserRole({ name, description })),
    doUpdateUserRole: ({ userRoleId, name, description }) => dispatch(updateUserRole({ userRoleId, name, description })),
  }
};

export default connect(
  null,
  mapDispatchToProps,
)(RoleCreateAndUpdate);
