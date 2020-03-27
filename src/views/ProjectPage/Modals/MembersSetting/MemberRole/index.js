import { find, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { addProjectRoleToMember } from '../../../../../actions/project/addProjectRoleToMember';
import { removeProjectRoleFromMember } from '../../../../../actions/project/removeProjectRoleFromMember';
import RoleManagerModal from '../../../../DepartmentPage/Modals/RoleManager';
import MemberRolePresenter from './presenters';
import { bgColorSelector, membersSelector, updateMemberRoleSelector, userRolesSelector } from './selectors';

function MemberRole({
  open, setOpen,
  bgColor, userRoles, updateMemberRole, members,
  curMemberId = null,
  doRemoveProjectRoleFromMember, doAddProjectRoleToMember
}) {

  const { projectId } = useParams();
  const [openRoleManager, setOpenRoleManager] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case 'ROLE':
        setOpenRoleManager(true);
        return;
      default: return;
    }
  }

  return (
    <>
      <MemberRolePresenter
        open={open} setOpen={setOpen}
        curMemberId={curMemberId} members={members}
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
        handleOpenModal={doOpenModal}
      />
      <RoleManagerModal
        open={openRoleManager}
        setOpen={setOpenRoleManager}
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
    doAddProjectRoleToMember: ({ projectId, memberId, roleId }) => dispatch(addProjectRoleToMember({ projectId, memberId, roleId })),
    doRemoveProjectRoleFromMember: ({ projectId, memberId, roleId }) => dispatch(removeProjectRoleFromMember({ projectId, memberId, roleId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberRole);
