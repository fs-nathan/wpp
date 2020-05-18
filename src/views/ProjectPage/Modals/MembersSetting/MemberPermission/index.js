import { memberProject } from 'actions/project/memberProject';
import { removeGroupPermissionMember } from 'actions/project/removeGroupPermissionMember';
import { updateGroupPermissionMember } from 'actions/project/updateGroupPermissionMember';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import MemberPermissionPresenter from './presenters';
import { bgColorSelector, membersSelector, permissionsSelector, updateGroupPermissionSelector } from './selectors';

function MemberRole({
  open, setOpen,
  bgColor, permissions, members,
  curMemberId = null,
  doUpdateGroupPermissionMember,
  doRemoveGroupPermissionMember,
  updateGroupPermission,
  doReloadMember,
}) {

  const { projectId } = useParams();

  return (
    <MemberPermissionPresenter
      open={open} setOpen={setOpen}
      projectId={projectId}
      doReloadMember={() => doReloadMember(projectId)}
      curMemberId={curMemberId} members={members}
      bgColor={bgColor} permissions={permissions}
      updateGroupPermission={updateGroupPermission}
      handleUpdateGroupPermission={groupPermissionId =>
        groupPermissionId
          ? doUpdateGroupPermissionMember({
            projectId,
            memberId: curMemberId,
            groupPermission: groupPermissionId
          })
          : doRemoveGroupPermissionMember({
            projectId,
            memberId: curMemberId,
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
    doReloadMember: (projectId) => dispatch(memberProject({ projectId }, true)),
    doUpdateGroupPermissionMember: ({ projectId, memberId, groupPermission }) => dispatch(updateGroupPermissionMember({ projectId, memberId, groupPermission })),
    doRemoveGroupPermissionMember: ({ projectId, memberId }) => dispatch(removeGroupPermissionMember({ projectId, memberId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberRole);
