import React from 'react';
import KanbanPresenter from './presenters';
import StageSettingModal from './Modals/StageSettingModal';
import MembersSettingModal from 'views/ProjectPage/Modals/MembersSetting';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { visibleSelector } from './selectors';

function KanbanPage({
  visible,
}) {

  const { projectId } = useParams();
  const [ openStageSettingModal, setOpenStageSettingModal ] = React.useState(false);
  const [ openStageSettingProps, setOpenStageSettingProps ] = React.useState({});
  const [ openMemberSettingModal, setOpenMemberSettingModal ] = React.useState(false);
  const [ openMemberSettingProps, setOpenMemberSettingProps ] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'STAGE_SETTING': {
        setOpenStageSettingModal(true);
        setOpenStageSettingProps(props);
        return;
      }
      case 'MEMBER_SETTING': {
        setOpenMemberSettingModal(true);
        setOpenMemberSettingProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <KanbanPresenter 
        projectId={projectId} 
        handleOpenModal={doOpenModal}
        isOpen={visible}
      />
      <StageSettingModal 
        open={openStageSettingModal}
        setOpen={setOpenStageSettingModal}
        {...openStageSettingProps}
      />
      <MembersSettingModal 
        open={openMemberSettingModal}
        setOpen={setOpenMemberSettingModal}
        {...openMemberSettingProps}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    visible: visibleSelector(state), 
  }
};

export default connect(mapStateToProps, null)(KanbanPage);