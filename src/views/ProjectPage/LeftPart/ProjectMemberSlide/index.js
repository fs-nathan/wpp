import { memberProject } from 'actions/project/memberProject';
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

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [projectId, 'update_project'], false)) return;
    if (projectId !== null) {
      doMemberProject({ projectId });
    }
    // eslint-disable-next-line
  }, [projectId, viewPermissions]);

  const [searchPatern, setSearchPatern] = React.useState('');

  const newMembers = {
    ...members,
    'members': filter(
      get(members, 'members', []),
      member => get(member, 'name', '').toLowerCase().includes(searchPatern.toLowerCase()),
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
