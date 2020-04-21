import React from 'react';
import { connect } from 'react-redux';
import UserPermissionPresenter from './presenters';
import { bgColorSelector, permissionsSelector } from './selectors';

function UserPermission({
  open, setOpen,
  bgColor, permissions,
  curUser = null,
}) {

  return (
    <UserPermissionPresenter
      open={open} setOpen={setOpen} bgColor={bgColor}
      curUser={curUser} permissions={permissions}
    />
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    permissions: permissionsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserPermission);
