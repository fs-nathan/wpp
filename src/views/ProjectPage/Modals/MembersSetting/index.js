import React from 'react';
import { useParams } from 'react-router-dom';
import AlertModal from '../../../../components/AlertModal';
import { connect } from 'react-redux';
import { get, map, filter } from 'lodash';
import { addMemberProject } from '../../../../actions/project/addMemberToProject';
import { removeMemberProject } from '../../../../actions/project/removeMemberFromProject';
import { updateStateJoinTask } from '../../../../actions/project/updateStateJoinTask';
import { assignMemberToAllTask } from '../../../../actions/project/assignMemberToAllTask';
import MemberRoleModal from './MemberRole';
import { addMemberSelector, membersSelector } from './selectors';
import MemberSettingPresenter from './presenters';

function MemberSetting({ 
  open, setOpen, 
  members, addMember,
  doAddMemberProject, doRemoveMemberProject, 
  doUpdateStateJoinTask,
  doAssignMemberToAllTask,
}) {

  const { projectId } = useParams();
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
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'ROLE': 
        setOpenRole(true);
        setRoleProps(props);
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doAddMemberProject: ({ projectId, memberId, groupPermission, roles, }) => dispatch(addMemberProject({ projectId, memberId, groupPermission, roles, })),
    doRemoveMemberProject: ({ projectId, memberId, }) => dispatch(removeMemberProject({ projectId, memberId, })),
    doUpdateStateJoinTask: ({ projectId, memberId, state, }) => dispatch(updateStateJoinTask({ projectId, memberId, state, })),
    doAssignMemberToAllTask: ({ projectId, memberId, }) => dispatch(assignMemberToAllTask({ projectId, memberId })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MemberSetting);
