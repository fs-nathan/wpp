import { listGroupTask } from "actions/groupTask/listGroupTask";
import { sortGroupTask } from "actions/groupTask/sortGroupTask";
import { setProject } from "actions/localStorage";
import { detailProject } from "actions/project/detailProject";
import { hideProject } from "actions/project/hideProject";
import { showProject } from "actions/project/showProject";
import { createTask } from "actions/task/createTask";
import { deleteTask } from "actions/task/deleteTask";
import { listTask } from "actions/task/listTask";
import { sortTask } from "actions/task/sortTask";
import {
  createMember,
  deleteMember,
} from "actions/taskDetail/taskDetailActions";
import { getPermissionViewDetailProject } from "actions/viewPermissions";
import AlertModal from "components/AlertModal";
import AssignCalendarModal from "components/AssignCalendarModal";
import { CustomLayoutContext } from "components/CustomLayout";
import { useTimes } from "components/CustomPopover";
import ShareProjectModal from "components/ShareProjectModal/ShareProjectModal";
import {
  COPY_GROUP_TASK,
  CREATE_GROUP_TASK,
  CREATE_TASK,
  CustomEventDispose,
  CustomEventListener,
  DELETE_GROUP_TASK,
  DELETE_TASK,
  SORT_GROUP_TASK,
  SORT_TASK,
  UPDATE_DURATION_TASK,
  UPDATE_GROUP_TASK,
  UPDATE_INFOMATION_TASK,
} from "constants/events";
import { get } from "lodash";
import moment from "moment";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { connect, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import CreateJobModal from "views/JobDetailPage/ListPart/ListHeader/CreateJobModal";
import MenuCreateNew from "views/JobDetailPage/ListPart/ListHeader/MenuCreateNew";
import CreateGroupTask from "views/ProjectPage/Modals/CreateGroupTask";
import { listTaskMember } from "../../../../actions/task/listTaskMember";
import AddMemberModal from "../../../JobDetailPage/ListPart/ListHeader/AddMemberModal";
import ProjectSettingModal from "../../../ProjectGroupPage/Modals/ProjectSetting";
import MemberSetting from "../../Modals/MembersSetting";
import { localOptionSelector, viewPermissionsSelector } from "../../selectors";
import AllTaskTablePresenter from "./presenters";
import {
  bgColorSelector,
  memberTaskSelector,
  projectSelector,
  showHidePendingsSelector,
  tasksSelector,
} from "./selectors";

function AllTaskTable({
  expand,
  handleExpand,
  viewPermissions,
  bgColor,
  showHidePendings,
  handleSubSlide,
  tasks,
  project,
  doShowProject,
  doHideProject,
  doDeleteTask,
  doCreateTask,
  doSortTask,
  isShortGroup,
  doDetailProject,
  doListGroupTask,
  doListTask,
  doListTaskMember,
  doGetPermissionViewDetailProject,
  doSetProject,
  memberTask,
  localOption,
  doDeleteMemberFromTask,
  doAddMemberToTask,
  doSortGroupTask,
}) {
  const times = useTimes();
  const { t } = useTranslation();
  const { timeType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return {
      timeStart,
      timeEnd,
    };
  }, [timeType]);
  const { projectId, memberId, templateId } = useParams();
  const reloadListTask = () => {
    doListTask({
      projectId,
      timeStart: get(timeRange, "timeStart")
        ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
        : undefined,
      timeEnd: get(timeRange, "timeEnd")
        ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
        : undefined,
    });
  };

  const reloadListTaskAndGroupTask = () => {
    reloadListTask();
    doListGroupTask({ projectId });
  };

  React.useEffect(() => {
    if (projectId !== null) {
      doListTask({
        projectId,
        timeStart: get(timeRange, "timeStart")
          ? moment(get(timeRange, "timeStart")).format("YYYY-MM-DD")
          : undefined,
        timeEnd: get(timeRange, "timeEnd")
          ? moment(get(timeRange, "timeEnd")).format("YYYY-MM-DD")
          : undefined,
      });

      const createTaskSuccess = (event) => {
        reloadListTask();
        if (
          !localStorage.getItem(`MODAL_MEMBER_TASK_MARK_NOT_SHOW_${projectId}`)
        ) {
          setOpenModalAddMember(event.detail.task);
        }
      };

      CustomEventListener(SORT_GROUP_TASK, reloadListTask);
      CustomEventListener(CREATE_TASK, createTaskSuccess);
      CustomEventListener(SORT_TASK, reloadListTask);
      CustomEventListener(UPDATE_DURATION_TASK, reloadListTask);
      CustomEventListener(UPDATE_INFOMATION_TASK, reloadListTask);
      CustomEventListener(
        CREATE_GROUP_TASK.SUCCESS,
        reloadListTaskAndGroupTask
      );
      CustomEventListener(COPY_GROUP_TASK.SUCCESS, reloadListTaskAndGroupTask);
      CustomEventListener(
        UPDATE_GROUP_TASK.SUCCESS,
        reloadListTaskAndGroupTask
      );
      CustomEventListener(
        DELETE_GROUP_TASK.SUCCESS,
        reloadListTaskAndGroupTask
      );
      return () => {
        CustomEventDispose(SORT_GROUP_TASK, reloadListTaskAndGroupTask);
        CustomEventDispose(CREATE_TASK, createTaskSuccess);
        CustomEventDispose(SORT_TASK, reloadListTask);
        CustomEventDispose(UPDATE_DURATION_TASK, reloadListTask);
        CustomEventDispose(UPDATE_INFOMATION_TASK, reloadListTask);
        CustomEventDispose(
          CREATE_GROUP_TASK.SUCCESS,
          reloadListTaskAndGroupTask
        );
        CustomEventDispose(COPY_GROUP_TASK.SUCCESS, reloadListTaskAndGroupTask);
        CustomEventDispose(
          UPDATE_GROUP_TASK.SUCCESS,
          reloadListTaskAndGroupTask
        );
        CustomEventDispose(
          DELETE_GROUP_TASK.SUCCESS,
          reloadListTaskAndGroupTask
        );
      };
    }
  }, [projectId, timeRange]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [projectId, "update_project"], false))
      return;
    if (projectId !== null) {
      doListGroupTask({ projectId });
      const reloadListGroupTask = () => {
        doListGroupTask({ projectId });
      };
      CustomEventListener(SORT_GROUP_TASK, reloadListGroupTask);
      return () => {
        CustomEventDispose(SORT_GROUP_TASK, reloadListGroupTask);
      };
    }
  }, [projectId, viewPermissions]);

  React.useEffect(() => {
    if (projectId !== null) {
      doDetailProject({ projectId });
      const reloadDetailProject = () => {
        doDetailProject({ projectId });
      };
      CustomEventListener(DELETE_TASK, reloadDetailProject);
      return () => {
        CustomEventDispose(DELETE_TASK, reloadDetailProject);
      };
    }
  }, [projectId, timeRange]);

  const {
    openMemberSetting,
    setOpenMemberSetting,
    openCalendar,
    setOpenCalendar,
    openSetting,
    setOpenSetting,
    settingProps,
    openMenuCreate,
    setOpenMenuCreate,
    selectedGroup,
    setSelectedGroup,
    openShareProject,
    setOpenShareProject,
    openUnShareProject,
    setOpenUnShareProject,
  } = useContext(CustomLayoutContext);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});
  const [openModalAddMember, setOpenModalAddMember] = React.useState(false);
  const [openCreateTaskGroup, setOpenCreateTaskGroup] = React.useState(false);

  function doOpenModal(type, props) {
    switch (type) {
      case "CREATE":
        setOpenCreate(true);
        setSelectedGroup(props);
        return;
      case "MENU_CREATE":
        setOpenMenuCreate(true);
        setSelectedGroup(props);
        return;
      case "ALERT":
        setOpenAlert(true);
        setAlertProps(props);
        return;
      case "ADD_MEMBER":
        setOpenModalAddMember(true);
        return;
      default:
        return;
    }
  }

  function handleRemoveMember(taskId) {
    // doDeleteMemberFromTask({task_id: taskId, member_id: memberId});
  }
  function handleAddMember(taskId) {
    // doAddMemberToTask({task_id: taskId, member_id: memberId});
  }

  function handleUnShare() {
    // get(project, "id")
    setOpenUnShareProject(false);
  }

  return (
    <>
      <AllTaskTablePresenter
        expand={expand}
        handleExpand={handleExpand}
        handleSubSlide={handleSubSlide}
        canUpdateProject={get(
          viewPermissions.permissions,
          [projectId, "update_project"],
          false
        )}
        canCreateTask={true}
        isShortGroup={isShortGroup}
        showHidePendings={showHidePendings}
        tasks={tasks}
        project={project}
        memberID={memberId}
        memberTask={memberTask}
        handleShowOrHideProject={(project) =>
          get(project, "visibility", false)
            ? doHideProject({ projectId: get(project, "id") })
            : doShowProject({ projectId: get(project, "id") })
        }
        handleDeleteTask={(task) => doDeleteTask({ taskId: get(task, "id") })}
        handleRemoveMemberFromTask={(taskId) => handleRemoveMember(taskId)}
        handleAddMemberToTask={(taskId) => handleAddMember(taskId)}
        handleOpenModal={doOpenModal}
        handleReload={reloadListTaskAndGroupTask}
        handleReloadListTask={reloadListTask}
        bgColor={bgColor}
        timeType={timeType}
        handleTimeType={(timeType) =>
          doSetProject({
            ...localOption,
            timeType,
          })
        }
      />
      <MenuCreateNew
        setOpenCreateTaskGroup={setOpenCreateTaskGroup}
        setOpenMenuCreate={setOpenMenuCreate}
        setOpenCreate={setOpenCreate}
        anchorEl={openMenuCreate}
        setAnchorEl={setOpenMenuCreate}
      />
      <CreateGroupTask
        open={openCreateTaskGroup}
        setOpen={setOpenCreateTaskGroup}
      />
      <CreateJobModal
        isOpen={openCreate}
        setOpen={setOpenCreate}
        projectId={projectId}
        groupId={selectedGroup}
        project={project}
        fromView={"Table"}
      />
      {openSetting && (
        <ProjectSettingModal
          open={openSetting}
          setOpen={setOpenSetting}
          {...settingProps}
        />
      )}
      <AssignCalendarModal
        openModal={openCalendar}
        setopenModal={setOpenCalendar}
      />
      <ShareProjectModal
        openModal={openShareProject}
        setopenModal={setOpenShareProject}
      />
      <AlertModal
        open={openUnShareProject}
        setOpen={setOpenUnShareProject}
        content={t("UN_SHARE_PROJECT_TITLE")}
        onConfirm={() => {
          handleUnShare();
        }}
        onCancle={() => setOpenUnShareProject(false)}
        manualClose
      />
      <AlertModal open={openAlert} setOpen={setOpenAlert} {...alertProps} />
      {openModalAddMember && (
        <AddMemberModal
          isOpen={openModalAddMember}
          setOpen={setOpenModalAddMember}
          task={openModalAddMember}
          projectActive={projectId}
        />
      )}
      {openMemberSetting && (
        <MemberSetting
          open={openMemberSetting}
          setOpen={setOpenMemberSetting}
        />
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    tasks: tasksSelector(state),
    project: projectSelector(state),
    bgColor: bgColorSelector(state),
    showHidePendings: showHidePendingsSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    localOption: localOptionSelector(state),
    memberTask: memberTaskSelector(state),
    isShortGroup: state.groupTask.sortGroupTask.sortgroup,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    doSortGroupTask: ({ groupTaskId, sortIndex }) =>
      dispatch(sortGroupTask({ groupTaskId, sortIndex })),
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDeleteTask: ({ taskId }) => dispatch(deleteTask({ taskId })),
    doSortTask: ({ taskId, projectId, groupTask, sortIndex }) =>
      dispatch(sortTask({ taskId, projectId, groupTask, sortIndex })),
    doCreateTask: ({
      name,
      projectId,
      groupTask,
      typeAssign,
      priority,
      description,
      startDate,
      startTime,
      endDate,
      endTime,
    }) =>
      dispatch(
        createTask({
          name,
          projectId,
          groupTask,
          typeAssign,
          priority,
          description,
          startDate,
          startTime,
          endDate,
          endTime,
        })
      ),
    doListTask: ({ projectId, timeStart, timeEnd }, quite) =>
      dispatch(listTask({ projectId, timeStart, timeEnd }, quite)),
    doListTaskMember: ({ projectId, memberId, quite }) =>
      dispatch(listTaskMember({ projectId, memberId }, quite)),
    doListGroupTask: ({ projectId }, quite) =>
      dispatch(listGroupTask({ projectId }, quite)),
    doDetailProject: ({ projectId }, quite) =>
      dispatch(detailProject({ projectId }, quite)),
    doSetProject: (value) => dispatch(setProject(value)),
    doGetPermissionViewDetailProject: ({ projectId }, quite) =>
      dispatch(getPermissionViewDetailProject({ projectId }, quite)),
    doDeleteMemberFromTask: ({ task_id, member_id }, quite) =>
      dispatch(
        deleteMember({ task_id, member_id, from: "TaskByMember" }, quite)
      ),
    doAddMemberToTask: ({ task_id, member_id }, quite) =>
      dispatch(
        createMember({ task_id, member_id, from: "TaskByMember" }),
        quite
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTaskTable);
