import React, { useContext, useLayoutEffect, useState } from "react";
import KanbanPresenter from "./presenters";
import StageSettingModal from "./Modals/StageSettingModal";
import MembersSettingModal from "views/ProjectPage/Modals/MembersSetting";
import EditProjectModal from "views/ProjectGroupPage/Modals/EditProject";
import ProjectSettingModal from "views/ProjectGroupPage/Modals/ProjectSetting";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { visibleSelector } from "./selectors";
//import AssignCalendarModal from "components/AssignCalendarModal";
import CalendarModal from "./Modals/CalendarModal";
import CreateNewGroupTask from "views/ProjectPage/Modals/CreateNewGroupTask";
import DeleteGroupTask from "views/ProjectPage/Modals/DeleteGroupTask";
import CreateJobModal from "views/JobDetailPage/ListPart/ListHeader/CreateJobModal";
import EditTaskModal from "./Modals/EditTaskModal";
import AlertModal from "components/AlertModal";
import CreateGroupTask from "views/ProjectPage/Modals/CreateGroupTask";
import ModalImage from "views/JobDetailPage/ModalImage";
import ManagerModal from "./Modals/ManagerModal";
import { getPermissionViewDetailProject } from "actions/viewPermissions";
import MenuCreateNew from "views/JobDetailPage/ListPart/ListHeader/MenuCreateNew";
import { CustomLayoutContext } from "components/CustomLayout";

function KanbanPage({
  visible,
  doGetPermissionViewDetailProject,
  handleExpand,
  expand,
}) {
  const {
    openMemberSettingModal,
    setOpenMemberSettingModal,
    openMemberSettingProps,
    openSettingProjectModal,
    setOpenSettingProjectModal,
    openSettingProjectProps,
    openCalendar,
    setOpenCalendar,
    openMenuCreate,
    setOpenMenuCreate,
  } = useContext(CustomLayoutContext);

  const { projectId } = useParams();
  useLayoutEffect(() => {
    doGetPermissionViewDetailProject({ projectId });
  }, [projectId]);

  const [openStageSettingModal, setOpenStageSettingModal] = useState(false);
  const [openStageSettingProps, setOpenStageSettingProps] = useState({});
  const [openEditProjectModal, setOpenEditProjectModal] = useState(false);
  const [openEditProjectProps, setOpenEditProjectProps] = useState({});
  const [openUpdateGroupTask, setOpenUpdateGroupTask] = useState(false);
  const [updateGroupTaskProps, setUpdateGroupTaskProps] = useState({});
  const [openDeleteGroupTask, setOpenDeleteGroupTask] = useState(false);
  const [deleteGroupTaskProps, setDeleteGroupTaskProps] = useState({});
  const [openCreateTask, setOpenCreateTask] = useState(false);
  const [createTaskProps, setCreateTaskProps] = useState({});
  const [openEditTask, setOpenEditTask] = useState(false);
  const [editTaskProps, setEditTaskProps] = useState({});
  const [openDeleteTask, setOpenDeleteTask] = useState(false);
  const [deleteTaskProps, setDeleteTaskProps] = useState({});
  const [openCreateGroupTask, setOpenCreateGroupTask] = useState(false);
  const [openManagers, setOpenManagers] = useState(false);
  const [managersProps, setManagersProps] = useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case "STAGE_SETTING": {
        setOpenStageSettingModal(true);
        setOpenStageSettingProps(props);
        return;
      }
      case "EDIT_PROJECT": {
        setOpenEditProjectModal(true);
        setOpenEditProjectProps(props);
        return;
      }
      case "CREATE_GROUPTASK": {
        setOpenCreateGroupTask(true);
        return;
      }
      case "UPDATE_GROUPTASK": {
        setOpenUpdateGroupTask(true);
        setUpdateGroupTaskProps(props);
        return;
      }
      case "DELETE_GROUPTASK": {
        setOpenDeleteGroupTask(true);
        setDeleteGroupTaskProps(props);
        return;
      }
      case "CREATE_TASK": {
        setOpenCreateTask(true);
        setCreateTaskProps(props);
        return;
      }
      case "EDIT_TASK": {
        setOpenEditTask(true);
        setEditTaskProps(props);
        return;
      }
      case "DELETE_TASK": {
        setOpenDeleteTask(true);
        setDeleteTaskProps(props);
        return;
      }
      case "MANAGERS": {
        setOpenManagers(true);
        setManagersProps(props);
        return;
      }

      default:
        return;
    }
  }

  return (
    <>
      <KanbanPresenter
        projectId={projectId}
        handleOpenModal={doOpenModal}
        isOpen={visible}
        expand={expand}
        handleExpand={handleExpand}
      />
      <MenuCreateNew
        setOpenCreateTaskGroup={setOpenCreateGroupTask}
        setOpenMenuCreate={setOpenMenuCreate}
        setOpenCreate={setOpenCreateTask}
        anchorEl={openMenuCreate}
        setAnchorEl={setOpenMenuCreate}
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

const mapStateToProps = (state) => {
  return {
    visible: visibleSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doGetPermissionViewDetailProject: ({ projectId }, quite) =>
      dispatch(getPermissionViewDetailProject({ projectId }, quite)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(KanbanPage);
