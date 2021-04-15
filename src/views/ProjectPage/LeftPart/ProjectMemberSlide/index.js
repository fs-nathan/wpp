import { memberProject } from 'actions/project/memberProject';
import { filter, get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import MemberModal from 'views/JobDetailPage/TabPart/MemberTab/MemberModal';
import MembersSettingModal from '../../Modals/MembersSetting';
import { viewPermissionsSelector } from '../../selectors';
import ProjectMemberSlidePresenter from './presenters';
import { membersSelector } from './selectors';
import { useParams } from 'react-router-dom';
import {
  EVENT_ADD_MEMBER_TO_TASK_SUCCESS,
  EVENT_REMOVE_MEMBER_FROM_TASK_SUCCESS
} from 'constants/actions/taskDetail/taskDetailConst';
import {CustomEventDispose, CustomEventListener} from "constants/events";
import { getPermissionViewDetailProject } from 'actions/viewPermissions';

function ProjectMemberSlide({
  handleSubSlide,
  members,
  doMemberProject,
  viewPermissions,
  doGetPermissionViewDetailProject,
}) {
  const { projectId } = useParams();
  React.useLayoutEffect(() => {
    if (viewPermissions.permissions === null) doGetPermissionViewDetailProject({ projectId }, true);
    // eslint-disable-next-line
  }, [projectId, doGetPermissionViewDetailProject]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [projectId, 'update_project'], false)) return;
    if (projectId !== null) {
      doMemberProject({ projectId });
      const reloadAfterActionMember = () => {
        doMemberProject({ projectId });
      }
      CustomEventListener(EVENT_ADD_MEMBER_TO_TASK_SUCCESS, reloadAfterActionMember);
      CustomEventListener(EVENT_REMOVE_MEMBER_FROM_TASK_SUCCESS, reloadAfterActionMember);
      return () => {
        CustomEventDispose(EVENT_ADD_MEMBER_TO_TASK_SUCCESS, reloadAfterActionMember);
        CustomEventDispose(EVENT_REMOVE_MEMBER_FROM_TASK_SUCCESS, reloadAfterActionMember);
      }
    }
  }, [projectId, viewPermissions]);

  const [searchPattern, setSearchPattern] = React.useState('');

  const newMembers = {
    ...members,
    'members': filter(
      get(members, 'members', []),
      member => get(member, 'name', '').toLowerCase().includes(searchPattern.toLowerCase()),
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
        searchPattern={searchPattern} setSearchPattern={setSearchPattern}
        handleOpenModal={doOpenModal}
      />
      <MembersSettingModal
        open={openMemberSetting}
        setOpen={setOpenMemberSetting}
      />
      <MemberModal />
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
    doGetPermissionViewDetailProject: ({ projectId }, quite) => dispatch(getPermissionViewDetailProject({ projectId }, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectMemberSlide);
