import { listGroupTask } from 'actions/groupTask/listGroupTask';
import { setProject } from 'actions/localStorage';
import { detailProject } from 'actions/project/detailProject';
import { hideProject } from 'actions/project/hideProject';
import { showProject } from 'actions/project/showProject';
import { createTask } from 'actions/task/createTask';
import { deleteTask } from 'actions/task/deleteTask';
import { listTask } from 'actions/task/listTask';
import { sortTask } from 'actions/task/sortTask';
import { getPermissionViewDetailProject } from 'actions/viewPermissions';
import AlertModal from 'components/AlertModal';
import { useTimes } from 'components/CustomPopover';
import { CREATE_TASK, CustomEventDispose, CustomEventListener, DELETE_TASK, SORT_GROUP_TASK, SORT_TASK } from 'constants/events';
import { get, isNil } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreateJobModal from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal';
import ProjectSettingModal from '../../../ProjectGroupPage/Modals/ProjectSetting';
import { localOptionSelector, viewPermissionsSelector } from '../../selectors';
import AllTaskTablePresenter from './presenters';
import {
  bgColorSelector,
  memberTaskSelector,
  projectSelector,
  showHidePendingsSelector,
  tasksSelector
} from './selectors';
import {listTaskMember} from "../../../../actions/task/listTaskMember";
import { deleteMember, createMember } from 'actions/taskDetail/taskDetailActions';
import {
  EVENT_ADD_MEMBER_TO_TASK_SUCCESS,
  EVENT_REMOVE_MEMBER_FROM_TASK_SUCCESS
} from 'constants/actions/taskDetail/taskDetailConst';
import MemberPermissionModal from "../../Modals/MembersSetting/MemberPermission";
import AssignCalendarModal from "components/AssignCalendarModal";

function AllTaskTable({
  expand, handleExpand, viewPermissions,
  bgColor, showHidePendings, handleSubSlide,
  tasks, project, doShowProject, doHideProject,
  doDeleteTask, doCreateTask, doSortTask,
  doDetailProject, doListGroupTask, doListTask, doListTaskMember,
  doGetPermissionViewDetailProject, doSetProject, memberTask,
  localOption, doDeleteMemberFromTask, doAddMemberToTask
}) {

  const times = useTimes();
  const { timeType } = localOption;
  const timeRange = React.useMemo(() => {
    const [timeStart, timeEnd] = times[timeType].option();
    return ({
      timeStart,
      timeEnd,
    });
  }, [timeType]);
  const { projectId, memberId } = useParams();

  React.useLayoutEffect(() => {
    doGetPermissionViewDetailProject({ projectId });
  }, [projectId]);

  React.useEffect(() => {
    if (projectId !== null && isNil(memberId)) {
      doListTask({
        projectId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      });
      const reloadListTask = () => {
        doListTask({
          projectId,
          timeStart: get(timeRange, 'timeStart')
            ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
            : undefined,
          timeEnd: get(timeRange, 'timeEnd')
            ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
            : undefined,
        });
      }
      CustomEventListener(SORT_GROUP_TASK, reloadListTask);
      CustomEventListener(CREATE_TASK, reloadListTask);
      CustomEventListener(SORT_TASK, reloadListTask);
      return () => {
        CustomEventDispose(SORT_GROUP_TASK, reloadListTask);
        CustomEventDispose(CREATE_TASK, reloadListTask);
        CustomEventDispose(SORT_TASK, reloadListTask);
      }
    }
  }, [projectId, timeRange, memberId]);

  React.useEffect(() => {
    if(!isNil(memberId)) {
      doListTaskMember({projectId, memberId});
      const reloadAfterActionMember = () => {
        doListTaskMember({projectId, memberId});
      }
      CustomEventListener(EVENT_REMOVE_MEMBER_FROM_TASK_SUCCESS, reloadAfterActionMember);
      CustomEventListener(EVENT_ADD_MEMBER_TO_TASK_SUCCESS, reloadAfterActionMember);
      return () => {
        CustomEventDispose(EVENT_REMOVE_MEMBER_FROM_TASK_SUCCESS, reloadAfterActionMember);
        CustomEventDispose(EVENT_ADD_MEMBER_TO_TASK_SUCCESS, reloadAfterActionMember);
      }
    }
  }, [memberId]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [projectId, 'update_project'], false)) return;
    if (projectId !== null) {
      doListGroupTask({ projectId });
      const reloadListGroupTask = () => {
        doListGroupTask({ projectId });
      }
      CustomEventListener(SORT_GROUP_TASK, reloadListGroupTask);
      return () => {
        CustomEventDispose(SORT_GROUP_TASK, reloadListGroupTask);
      }
    }
  }, [projectId, viewPermissions]);

  React.useEffect(() => {
    if (projectId !== null) {
      doDetailProject({ projectId });
      const reloadDetailProject = () => {
        doDetailProject({ projectId });
      }
      CustomEventListener(CREATE_TASK, reloadDetailProject);
      CustomEventListener(DELETE_TASK, reloadDetailProject);
      return () => {
        CustomEventDispose(CREATE_TASK, reloadDetailProject);
        CustomEventDispose(DELETE_TASK, reloadDetailProject);
      }
    }
  }, [projectId]);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);
  const [settingProps, setSettingProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});
  const [openPermission, setOpenPermission] = React.useState(false);
  const [permissionProps, setPermissionProps] = React.useState({});
  const [openCalendar, setOpenCalendar] = React.useState(false);
  const [selectedGroup, setSelectedGroup] = React.useState(null);

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE':
        if (get(viewPermissions.permissions, [projectId, 'create_task'], false)) {
          setOpenCreate(true);
          setSelectedGroup(props);
        }
        return;
      case 'SETTING':
        setOpenSetting(true);
        setSettingProps(props);
        return;
      case "PERMISSION":
        setOpenPermission(true);
        setPermissionProps(props);
        return;
      case 'ALERT':
        setOpenAlert(true);
        setAlertProps(props);
        return;
      case 'CALENDAR':
        setOpenCalendar(true);
        return;
      default: return;
    }
  }
  function handleRemoveMember(taskId) {
    doDeleteMemberFromTask({task_id: taskId, member_id: memberId});
  }
  function handleAddMember(taskId) {
    doAddMemberToTask({task_id: taskId, member_id: memberId});
  }

  return (
    <>
      <AllTaskTablePresenter
        expand={expand} handleExpand={handleExpand}
        handleSubSlide={handleSubSlide}
        canUpdateProject={get(viewPermissions.permissions, [projectId, 'update_project'], false)}
        canCreateTask={get(viewPermissions.permissions, [projectId, 'create_task'], false)}
        showHidePendings={showHidePendings}
        tasks={tasks} project={project} memberID={memberId} memberTask={memberTask}
        handleShowOrHideProject={project =>
          get(project, 'visibility', false)
            ? doHideProject({ projectId: get(project, 'id') })
            : doShowProject({ projectId: get(project, 'id') })
        }
        handleDeleteTask={task =>
          doDeleteTask({ taskId: get(task, 'id') })
        }
        handleSortTask={(taskId, groupTask, sortIndex) =>
          doSortTask({
            taskId,
            projectId,
            groupTask: groupTask === 'default' ? undefined : groupTask,
            sortIndex,
          })
        }
        handleRemoveMemberFromTask={(taskId) => handleRemoveMember(taskId)}
        handleAddMemberToTask={(taskId) => handleAddMember(taskId)}
        handleOpenModal={doOpenModal}
        bgColor={bgColor}
        timeType={timeType}
        handleTimeType={timeType => doSetProject({
          ...localOption,
          timeType,
        })}
      />
      <CreateJobModal
        isOpen={openCreate}
        setOpen={setOpenCreate}
        projectId={projectId}
        groupId={selectedGroup}
        project={project}
      />
      <ProjectSettingModal
        open={openSetting}
        setOpen={setOpenSetting}
        {...settingProps}
      />
      <MemberPermissionModal
          open={openPermission}
          setOpen={setOpenPermission}
          project_id={projectId}
          {...permissionProps}
      />
      <AssignCalendarModal
        openModal={openCalendar}
        setopenModal={setOpenCalendar}
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
    tasks: tasksSelector(state),
    project: projectSelector(state),
    bgColor: bgColorSelector(state),
    showHidePendings: showHidePendingsSelector(state),
    viewPermissions: viewPermissionsSelector(state),
    localOption: localOptionSelector(state),
    memberTask: memberTaskSelector(state)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDeleteTask: ({ taskId }) => dispatch(deleteTask({ taskId })),
    doSortTask: ({ taskId, projectId, groupTask, sortIndex }) => dispatch(sortTask({ taskId, projectId, groupTask, sortIndex })),
    doCreateTask: ({ name, projectId, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, }) => dispatch(createTask({ name, projectId, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, })),
    doListTask: ({ projectId, timeStart, timeEnd, }, quite) => dispatch(listTask({ projectId, timeStart, timeEnd, }, quite)),
    doListTaskMember: ({projectId, memberId, quite}) => dispatch(listTaskMember({projectId, memberId}, quite)),
    doListGroupTask: ({ projectId }, quite) => dispatch(listGroupTask({ projectId }, quite)),
    doDetailProject: ({ projectId }, quite) => dispatch(detailProject({ projectId }, quite)),
    doSetProject: (value) => dispatch(setProject(value)),
    doGetPermissionViewDetailProject: ({ projectId }, quite) => dispatch(getPermissionViewDetailProject({ projectId }, quite)),
    doDeleteMemberFromTask: ({task_id, member_id}, quite) => dispatch(deleteMember({task_id,member_id, from: "TaskByMember"},quite)),
    doAddMemberToTask: ({task_id, member_id}, quite) => dispatch(createMember({task_id,member_id, from: "TaskByMember"}), quite)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllTaskTable);