import { addProjectRoleToMember } from 'actions/project/addProjectRoleToMember';
import { memberProject } from 'actions/project/memberProject';
import { removeProjectRoleFromMember } from 'actions/project/removeProjectRoleFromMember';
import { find, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import MemberRolePresenter from './presenters';
import { bgColorSelector, membersSelector, updateMemberRoleSelector, userRolesSelector } from './selectors';

function MemberRole({
  open, setOpen,
  bgColor, userRoles, updateMemberRole, members,
  curMemberId = null,
  doRemoveProjectRoleFromMember, doAddProjectRoleToMember,
  doReloadMember,
}) {

  const { projectId } = useParams();

  return (
    <>
      <MemberRolePresenter
        open={open} setOpen={setOpen}
        curMemberId={curMemberId} members={members}
        projectId={projectId}
        doReloadMember={() => doReloadMember(projectId)}
        bgColor={bgColor} userRoles={userRoles} updateMemberRole={updateMemberRole}
        handleUpdateRoleOfMember={curRole => {
          get(find(members.members, { id: curMemberId }), 'roles', [])
            .map(role => get(role, 'id'))
            .includes(get(curRole, 'id'))
            ? doRemoveProjectRoleFromMember({
              projectId,
              memberId: curMemberId,
              roleId: get(curRole, 'id'),
            })
            : doAddProjectRoleToMember({
              projectId,
              memberId: curMemberId,
              roleId: get(curRole, 'id'),
            })
        }}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    bgColor: bgColorSelector(state),
    userRoles: userRolesSelector(state),
    updateMemberRole: updateMemberRoleSelector(state),
    members: membersSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doReloadMember: (projectId) => dispatch(memberProject({ projectId }, true)),
    doAddProjectRoleToMember: ({ projectId, memberId, roleId }) => dispatch(addProjectRoleToMember({ projectId, memberId, roleId })),
    doRemoveProjectRoleFromMember: ({ projectId, memberId, roleId }) => dispatch(removeProjectRoleFromMember({ projectId, memberId, roleId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberRole);
