import React from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { filter, get, } from 'lodash';
import { Context as ProjectContext } from '../../index';
import MembersSettingModal from '../../Modals/MembersSetting';
import { membersSelector } from './selectors';
import ProjectMemberSlidePresenter from './presenters';

function ProjectMemberSlide({ 
  handleSubSlide, 
  members, 
}) {
  
  const { setProjectId } = React.useContext(ProjectContext);
  const { projectId } = useParams();
  const [searchPatern, setSearchPatern] = React.useState('');

  const newMembers = {
    ...members,
    members: filter(
      members.members,
      member => get(member, 'name').toLowerCase().includes(searchPatern.toLowerCase()),
    ),
  }
  
  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  const [openMemberSetting, setOpenMemberSetting] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case 'MEMBER_SETTING': {
        openMemberSetting(true);
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
    members: membersSelector(state)
  };
};

export default connect(
  mapStateToProps,
  null,
)(ProjectMemberSlide);
