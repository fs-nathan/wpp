import React from 'react';
import KanbanPresenter from './presenters';
import StageSettingModal from './Modals/StageSettingModal';
import MembersSettingModal from 'views/ProjectPage/Modals/MembersSetting';
import EditProjectModal from 'views/ProjectGroupPage/Modals/EditProject';
import ProjectSettingModal from 'views/ProjectGroupPage/Modals/ProjectSetting';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { visibleSelector } from './selectors';
import AssignCalendarModal from "components/AssignCalendarModal";

function KanbanPage({
  visible,
}) {

  const { projectId } = useParams();
  const [ openStageSettingModal, setOpenStageSettingModal ] = React.useState(false);
  const [ openStageSettingProps, setOpenStageSettingProps ] = React.useState({});
  const [ openMemberSettingModal, setOpenMemberSettingModal ] = React.useState(false);
  const [ openMemberSettingProps, setOpenMemberSettingProps ] = React.useState({});
  const [ openEditProjectModal, setOpenEditProjectModal ] = React.useState(false);
  const [ openEditProjectProps, setOpenEditProjectProps ] = React.useState({});
  const [ openSettingProjectModal, setOpenSettingProjectModal ] = React.useState(false);
  const [ openSettingProjectProps, setOpenSettingProjectProps ] = React.useState({});
  const [ openCalendar, setOpenCalendar ] = React.useState(false);

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
      case 'EDIT_PROJECT': {
        setOpenEditProjectModal(true);
        setOpenEditProjectProps(props);
        return;
      }
      case 'SETTING_PROJECT': {
        setOpenSettingProjectModal(true);
        setOpenSettingProjectProps(props);
        return;
      }
      case 'CALENDAR': {
        setOpenCalendar(true);
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
      <EditProjectModal 
        open={openEditProjectModal}
        setOpen={setOpenEditProjectModal}
        {...openEditProjectProps}
      />
      <ProjectSettingModal 
        open={openSettingProjectModal}
        setOpen={setOpenSettingProjectModal}
        {...openSettingProjectProps}
      />
      <AssignCalendarModal
        openModal={openCalendar}
        setopenModal={setOpenCalendar}
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