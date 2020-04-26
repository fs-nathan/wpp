import { memberProject } from 'actions/project/memberProject';
import { ADD_MEMBER_PROJECT, ADD_PROJECT_ROLE_TO_MEMBER, ASSIGN_MEMBER_TO_ALL_TASK, CustomEventDispose, CustomEventListener, REMOVE_MEMBER_PROJECT, REMOVE_PROJECT_ROLE_FROM_MEMBER, UPDATE_GROUP_PERMISSION_MEMBER, UPDATE_STATE_JOIN_TASK } from 'constants/events';
import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import MembersSettingModal from '../../Modals/MembersSetting';
import { viewPermissionsSelector } from '../../selectors';
import ProjectMemberSlidePresenter from './presenters';
import { membersSelector } from './selectors';

function ProjectMemberSlide({
  handleSubSlide,
  members,
  doMemberProject,
  viewPermissions,
}) {

  const { projectId } = useParams();
  const [id, setId] = React.useState(null);

  React.useEffect(() => {
    setId(projectId);
  }, [projectId]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [projectId, 'update_project'], false)) return;
    if (id !== null) {
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
  }, [id, viewPermissions]);

  const [searchPatern, setSearchPatern] = React.useState('');

  const newMembers = {
    ...members,
    members: filter(
      members.members,
      member => get(member, 'name').toLowerCase().includes(searchPatern.toLowerCase()),
    ),
  }

  const [openMemberSetting, setOpenMemberSetting] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case 'MEMBER_SETTING': {
        setOpenMemberSetting(true);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <ProjectMemberSlidePresenter
        handleSubSlide={handleSubSlide}
        members={newMembers}
        searchPatern={searchPatern} setSearchPatern={setSearchPatern}
        handleOpenModal={doOpenModal}
      />
      <MembersSettingModal
        open={openMemberSetting}
        setOpen={setOpenMemberSetting}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    members: membersSelector(state),
    viewPermissions: viewPermissionsSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doMemberProject: ({ projectId }, quite) => dispatch(memberProject({ projectId }, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectMemberSlide);
