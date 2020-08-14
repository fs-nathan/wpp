import { addMemberProject } from 'actions/project/addMemberToProject';
import { assignMemberToAllTask } from 'actions/project/assignMemberToAllTask';
import { memberProject } from 'actions/project/memberProject';
import { permissionProject } from 'actions/project/permissionProject';
import { removeMemberProject } from 'actions/project/removeMemberFromProject';
import { updateStateJoinTask } from 'actions/project/updateStateJoinTask';
import { listUserRole } from 'actions/userRole/listUserRole';
import { filter, get, isNil, map } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { viewPermissionsSelector } from '../../selectors';
import MemberPermissionModal from './MemberPermission';
import MemberRoleModal from './MemberRole';
import MemberSettingPresenter from './presenters';
import { addMemberSelector, membersSelector } from './selectors';

function MemberSetting({
  open, setOpen,
  members, addMember,
  doAddMemberProject, doRemoveMemberProject,
  doUpdateStateJoinTask,
  doAssignMemberToAllTask,
  doMemberProject,
  doPermissionProject,
  doListUserRole,
  viewPermissions,
  doReloadMember,
  project_id = null,
}) {

  const { projectId: _projectId } = useParams();
  const [projectId, setProjectId] = React.useState(_projectId);

  React.useEffect(() => {
    setProjectId(isNil(project_id) ? _projectId : project_id);
  }, [project_id, _projectId]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [projectId, 'update_project'], false)) return;
    if (projectId !== null) {
      doMemberProject({ projectId });
    }
  }, [projectId, viewPermissions]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [projectId, 'update_project'], false)) return;
    //doPermissionProject();
    doListUserRole();
  }, [projectId, viewPermissions]);

  const [searchPatern, setSearchPatern] = React.useState('');

  const newMembers = {
    ...members,
    free: map(
      members.free,
      room => {
        const { name, _id: id, users } = room;
        const newUsers = filter(
          users,
          user => get(user, 'name').toLowerCase().includes(searchPatern.toLowerCase())
        );
        return {
          name,
          id,
          users: newUsers,
        }
      }
    )
  }

  const [openRole, setOpenRole] = React.useState(false);
  const [roleProps, setRoleProps] = React.useState({});
  const [openPermission, setOpenPermission] = React.useState(false);
  const [permissionProps, setPermissionProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'ROLE':
        setOpenRole(true);
        setRoleProps(props);
        return;
      case 'PERMISSION':
        setOpenPermission(true);
        setPermissionProps(props);
        return;
      default: return;
    }
  }

  return (
    <>
      <MemberSettingPresenter
        open={open} setOpen={setOpen}
        doReloadMember={() => doReloadMember(projectId)}
        projectId={projectId}
        searchPatern={searchPatern} setSearchPatern={setSearchPatern}
        members={newMembers} addMember={addMember}
        handleAddMember={member =>
          doAddMemberProject({
            projectId,
            memberId: get(member, 'id'),
            groupPermission: 0,
            roles: [],
          })
        }
        handleRemoveMember={member =>
          doRemoveMemberProject({
            projectId,
            memberId: get(member, 'id'),
          })
        }
        handleUpdateStateJoinTask={(member, state) =>
          doUpdateStateJoinTask({
            projectId,
            memberId: get(member, 'id'),
            state,
          })
        }
        handleAssignMemberToAllTask={member =>
          doAssignMemberToAllTask({
            projectId,
            memberId: get(member, 'id'),
          })
        }
        handleOpenModal={doOpenModal}
      />
      <MemberRoleModal
        open={openRole}
        setOpen={setOpenRole}
        project_id={projectId}
        {...roleProps}
      />
      <MemberPermissionModal
        open={openPermission}
        setOpen={setOpenPermission}
        project_id={projectId}
        doReloadPermissions={() => doPermissionProject()}
        {...permissionProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    members: membersSelector(state),
    addMember: addMemberSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doAddMemberProject: ({ projectId, memberId, groupPermission, roles, }) => dispatch(addMemberProject({ projectId, memberId, groupPermission, roles, })),
    doRemoveMemberProject: ({ projectId, memberId, }) => dispatch(removeMemberProject({ projectId, memberId, })),
    doUpdateStateJoinTask: ({ projectId, memberId, state, }) => dispatch(updateStateJoinTask({ projectId, memberId, state, })),
    doAssignMemberToAllTask: ({ projectId, memberId, }) => dispatch(assignMemberToAllTask({ projectId, memberId })),
    doMemberProject: ({ projectId }, quite) => dispatch(memberProject({ projectId }, quite)),
    doReloadMember: (projectId) => dispatch(memberProject({ projectId }, true)),
    doPermissionProject: (quite) => dispatch(permissionProject(quite)),
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberSetting);
