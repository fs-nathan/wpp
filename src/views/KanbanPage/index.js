import React from 'react';
import KanbanPresenter from './presenters';
import StageSettingModal from './Modals/StageSettingModal';
import MembersSettingModal from 'views/ProjectPage/Modals/MembersSetting';
import EditProjectModal from 'views/ProjectGroupPage/Modals/EditProject';
import ProjectSettingModal from 'views/ProjectGroupPage/Modals/ProjectSetting';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { visibleSelector } from './selectors';
//import AssignCalendarModal from "components/AssignCalendarModal";
import CalendarModal from './Modals/CalendarModal';
import CreateNewGroupTask from 'views/ProjectPage/Modals/CreateNewGroupTask';
import DeleteGroupTask from 'views/ProjectPage/Modals/DeleteGroupTask';
import CreateJobModal from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal';
import EditTaskModal from './Modals/EditTaskModal';
import AlertModal from 'components/AlertModal';
import CreateGroupTask from 'views/ProjectPage/Modals/CreateGroupTask';
import ModalImage from "views/JobDetailPage/ModalImage";
import ManagerModal from './Modals/ManagerModal';
import { getPermissionViewDetailProject } from 'actions/viewPermissions';

function KanbanPage({
  visible,
  doGetPermissionViewDetailProject,
}) {

  const { projectId } = useParams();
  
  React.useLayoutEffect(() => {
    doGetPermissionViewDetailProject({ projectId });
  }, [projectId]);
  
  const [ openStageSettingModal, setOpenStageSettingModal ] = React.useState(false);
  const [ openStageSettingProps, setOpenStageSettingProps ] = React.useState({});
  const [ openMemberSettingModal, setOpenMemberSettingModal ] = React.useState(false);
  const [ openMemberSettingProps, setOpenMemberSettingProps ] = React.useState({});
  const [ openEditProjectModal, setOpenEditProjectModal ] = React.useState(false);
  const [ openEditProjectProps, setOpenEditProjectProps ] = React.useState({});
  const [ openSettingProjectModal, setOpenSettingProjectModal ] = React.useState(false);
  const [ openSettingProjectProps, setOpenSettingProjectProps ] = React.useState({});
  const [ openCalendar, setOpenCalendar ] = React.useState(false);  
  const [ openUpdateGroupTask, setOpenUpdateGroupTask ] = React.useState(false);
  const [ updateGroupTaskProps, setUpdateGroupTaskProps ] = React.useState({});
  const [ openDeleteGroupTask, setOpenDeleteGroupTask ] = React.useState(false);
  const [ deleteGroupTaskProps, setDeleteGroupTaskProps ] = React.useState({});
  const [ openCreateTask, setOpenCreateTask ] = React.useState(false);
  const [ createTaskProps, setCreateTaskProps ] = React.useState({});
  const [ openEditTask, setOpenEditTask ] = React.useState(false);
  const [ editTaskProps, setEditTaskProps ] = React.useState({});
  const [ openDeleteTask, setOpenDeleteTask ] = React.useState(false);
  const [ deleteTaskProps, setDeleteTaskProps ] = React.useState({});
  const [ openCreateGroupTask, setOpenCreateGroupTask ] = React.useState(false);
  const [ openManagers, setOpenManagers ] = React.useState(false);
  const [ managersProps, setManagersProps ] = React.useState({});

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
      case 'CREATE_GROUPTASK': {
        setOpenCreateGroupTask(true);
        return;
      }
      case 'UPDATE_GROUPTASK': {
        setOpenUpdateGroupTask(true);
        setUpdateGroupTaskProps(props);
        return;
      }
      case 'DELETE_GROUPTASK': {
        setOpenDeleteGroupTask(true);
        setDeleteGroupTaskProps(props);
        return;
      }
      case 'CREATE_TASK': {
        setOpenCreateTask(true);
        setCreateTaskProps(props);
        return;
      }
      case 'EDIT_TASK': {
        setOpenEditTask(true);
        setEditTaskProps(props);
        return;
      }
      case 'DELETE_TASK': {
        setOpenDeleteTask(true);
        setDeleteTaskProps(props);
        return;
      }
      case 'MANAGERS': {
        setOpenManagers(true);
        setManagersProps(props);
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
      <CalendarModal
        open={openCalendar}
        setOpen={setOpenCalendar}
        projectId={projectId}
      />
      <CreateNewGroupTask
        open={openUpdateGroupTask}
        setOpen={setOpenUpdateGroupTask}
        {...updateGroupTaskProps}
      />
      <DeleteGroupTask
        open={openDeleteGroupTask}
        setOpen={setOpenDeleteGroupTask}
        {...deleteGroupTaskProps}
      />
      <CreateJobModal
        isOpen={openCreateTask}
        setOpen={setOpenCreateTask}
        {...createTaskProps}
      />
      <EditTaskModal
        open={openEditTask}
        setOpen={setOpenEditTask}
        {...editTaskProps}
      />
      <AlertModal
        open={openDeleteTask}
        setOpen={setOpenDeleteTask}
        {...deleteTaskProps}
      />
      <CreateGroupTask 
        open={openCreateGroupTask}
        setOpen={setOpenCreateGroupTask}
      />
      <ModalImage />
      <ManagerModal 
        open={openManagers}
        setOpen={setOpenManagers}
        {...managersProps}
      />
    </>
  );
}

const mapStateToProps = state => {
  return {
    visible: visibleSelector(state), 
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doGetPermissionViewDetailProject: ({ projectId }, quite) => dispatch(getPermissionViewDetailProject({ projectId }, quite)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(KanbanPage);