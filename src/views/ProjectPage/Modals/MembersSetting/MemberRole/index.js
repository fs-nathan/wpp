import React from 'react';
import { useParams } from 'react-router-dom';
import RoleManagerModal from '../../../../DepartmentPage/Modals/RoleManager';
import { addProjectRoleToMember } from '../../../../../actions/project/addProjectRoleToMember';
import { removeProjectRoleFromMember } from '../../../../../actions/project/removeProjectRoleFromMember';
import { connect } from 'react-redux';
import { get } from 'lodash';
import { bgColorSelector, updateMemberRoleSelector, userRolesSelector } from './selectors';
import MemberRolePresenter from './presenters';

function MemberRole({ 
  open, setOpen, 
  bgColor, userRoles, updateMemberRole,
  curMember = null, 
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
        curMember={curMember}
        bgColor={bgColor} userRoles={userRoles} updateMemberRole={updateMemberRole}
        handleUpdateRoleOfMember={curRole => {
          get(curMember, 'roles', [])
            .map(role => get(role, 'id'))
            .includes(get(curRole, 'id'))
            ? doRemoveProjectRoleFromMember({
                projectId,
                memberId: get(curMember, 'id'),
                roleId: get(curRole, 'id'),
              })
            : doAddProjectRoleToMember({
                projectId,
                memberId: get(curMember, 'id'),
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
