import { createUserRole } from 'actions/userRole/createUserRole';
import { updateUserRole } from 'actions/userRole/updateUserRole';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import RoleCreateAndUpdatePresenter from './presenters';
import { activeLoadingSelector } from './selectors';

function RoleCreateAndUpdate({ open, setOpen, activeLoading, updatedUserRole = null, doCreateUserRole, doUpdateUserRole }) {

  return (
    <RoleCreateAndUpdatePresenter
      open={open}
      setOpen={setOpen}
      activeLoading={activeLoading}
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
  state => ({
    activeLoading: activeLoadingSelector(state),
  }),
  mapDispatchToProps,
)(RoleCreateAndUpdate);
