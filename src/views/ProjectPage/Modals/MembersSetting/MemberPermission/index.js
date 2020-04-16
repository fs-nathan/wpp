import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { updateGroupPermissionMember } from '../../../../../actions/project/updateGroupPermissionMember';
import MemberPermissionPresenter from './presenters';
import { bgColorSelector, membersSelector, permissionsSelector, updateGroupPermissionSelector } from './selectors';

function MemberRole({
  open, setOpen,
  bgColor, permissions, members,
  curMemberId = null,
  doUpdateGroupPermissionMember,
  updateGroupPermission,
}) {

  const { projectId } = useParams();

  return (
    <MemberPermissionPresenter
      open={open} setOpen={setOpen}
      curMemberId={curMemberId} members={members}
      bgColor={bgColor} permissions={permissions}
      updateGroupPermission={updateGroupPermission}
      handleUpdateGroupPermission={groupPermissionId =>
        doUpdateGroupPermissionMember({
          projectId,
          memberId: curMemberId,
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
    members: membersSelector(state),
    updateGroupPermission: updateGroupPermissionSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doUpdateGroupPermissionMember: ({ projectId, memberId, groupPermission }) => dispatch(updateGroupPermissionMember({ projectId, memberId, groupPermission })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberRole);
