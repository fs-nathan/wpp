import { addMemberProject } from 'actions/project/addMemberToProject';
import { assignMemberToAllTask } from 'actions/project/assignMemberToAllTask';
import { memberProject } from 'actions/project/memberProject';
import { permissionProject } from 'actions/project/permissionProject';
import { removeMemberProject } from 'actions/project/removeMemberFromProject';
import { updateStateJoinTask } from 'actions/project/updateStateJoinTask';
import { listUserRole } from 'actions/userRole/listUserRole';
import AlertModal from 'components/AlertModal';
import { ADD_MEMBER_PROJECT, ADD_PROJECT_ROLE_TO_MEMBER, ASSIGN_MEMBER_TO_ALL_TASK, CustomEventDispose, CustomEventListener, REMOVE_MEMBER_PROJECT, REMOVE_PROJECT_ROLE_FROM_MEMBER, UPDATE_GROUP_PERMISSION_MEMBER, UPDATE_STATE_JOIN_TASK } from 'constants/events';
import { filter, get, map } from 'lodash';
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
  doListUserRole,
  doMemberProject,
  doPermissionProject,
  viewPermissions,
}) {

  const { projectId } = useParams();
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    setId(projectId);
  }, [projectId]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [id, 'update_project'], false)) return;
    if (open && id !== null) {
      doMemberProject({ projectId: id });
      const reloadMemberProject = () => {
        doMemberProject({ projectId: id });
      }
      CustomEventListener(ADD_MEMBER_PROJECT, reloadMemberProject);
      CustomEventListener(REMOVE_MEMBER_PROJECT, reloadMemberProject);
      CustomEventListener(UPDATE_STATE_JOIN_TASK, reloadMemberProject);
      CustomEventListener(ASSIGN_MEMBER_TO_ALL_TASK, reloadMemberProject);
      CustomEventListener(ADD_PROJECT_ROLE_TO_MEMBER, reloadMemberProject);
      CustomEventListener(REMOVE_PROJECT_ROLE_FROM_MEMBER, reloadMemberProject);
      CustomEventListener(UPDATE_GROUP_PERMISSION_MEMBER, reloadMemberProject);
      return () => {
        CustomEventDispose(ADD_MEMBER_PROJECT, reloadMemberProject);
        CustomEventDispose(REMOVE_MEMBER_PROJECT, reloadMemberProject);
        CustomEventDispose(UPDATE_STATE_JOIN_TASK, reloadMemberProject);
        CustomEventDispose(ASSIGN_MEMBER_TO_ALL_TASK, reloadMemberProject);
        CustomEventDispose(ADD_PROJECT_ROLE_TO_MEMBER, reloadMemberProject);
        CustomEventDispose(REMOVE_PROJECT_ROLE_FROM_MEMBER, reloadMemberProject);
        CustomEventDispose(UPDATE_GROUP_PERMISSION_MEMBER, reloadMemberProject);
      }
    }
    // eslint-disable-next-line
  }, [id, open, viewPermissions]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [id, 'update_project'], false)) return;
    if (open) doListUserRole();
    // eslint-disable-next-line
  }, [id, open, viewPermissions]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [id, 'update_project'], false)) return;
    if (open) doPermissionProject();
    // eslint-disable-next-line
  }, [id, open, viewPermissions]);

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
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

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
      case 'ALERT':
        setOpenAlert(true);
        setAlertProps(props);
        return;
      default: return;
    }
  }

  return (
    <>
      <MemberSettingPresenter
        open={open} setOpen={setOpen}
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
        {...roleProps}
      />
      <MemberPermissionModal
        open={openPermission}
        setOpen={setOpenPermission}
        {...permissionProps}
      />
      <AlertModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
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
    doListUserRole: (quite) => dispatch(listUserRole(quite)),
    doPermissionProject: (quite) => dispatch(permissionProject(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberSetting);
