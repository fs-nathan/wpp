import { listGroupTask } from 'actions/groupTask/listGroupTask';
import { detailProject } from 'actions/project/detailProject';
import { hideProject } from 'actions/project/hideProject';
import { showProject } from 'actions/project/showProject';
import { createTask } from 'actions/task/createTask';
import { deleteTask } from 'actions/task/deleteTask';
import { listTask } from 'actions/task/listTask';
import { sortTask } from 'actions/task/sortTask';
import AlertModal from 'components/AlertModal';
import { ADD_MEMBER_PROJECT, ASSIGN_MEMBER_TO_ALL_TASK, COPY_GROUP_TASK, CREATE_GROUP_TASK, CREATE_TASK, CustomEventDispose, CustomEventListener, DELETE_GROUP_TASK, DELETE_TASK, REMOVE_MEMBER_PROJECT, SORT_GROUP_TASK, SORT_TASK, UPDATE_GROUP_TASK, UPDATE_STATE_JOIN_TASK } from 'constants/events';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CreateJobModal from 'views/JobDetailPage/ListPart/ListHeader/CreateJobModal';
import ProjectSettingModal from '../../../ProjectGroupPage/Modals/ProjectSetting';
import { Context as ProjectPageContext } from '../../index';
import { viewPermissionsSelector } from '../../selectors';
import AllTaskTablePresenter from './presenters';
import { bgColorSelector, projectSelector, showHidePendingsSelector, tasksSelector } from './selectors';

function AllTaskTable({
  expand, handleExpand, viewPermissions,
  bgColor,
  showHidePendings,
  handleSubSlide,
  tasks, project,
  doShowProject, doHideProject,
  doDeleteTask, doCreateTask,
  doSortTask,
  doDetailProject,
  doListGroupTask,
  doListTask,
}) {

  const {
    setTimeRange, timeRange,
    localOptions, setLocalOptions,
    doGetPermissionViewDetailProject,
    doGetListTaskDetail,
  } = React.useContext(ProjectPageContext);

  const [id, setId] = React.useState(null);
  const { projectId } = useParams();

  React.useLayoutEffect(() => {
    doGetPermissionViewDetailProject({ projectId });
    // eslint-disable-next-line
  }, [projectId]);

  React.useEffect(() => {
    setId(projectId);
  }, [projectId]);

  const [timeType, setTimeType] = React.useState(localOptions.timeType);

  React.useEffect(() => {
    setLocalOptions(pastOptions => ({
      ...pastOptions,
      timeType,
    }));
    // eslint-disable-next-line
  }, [timeType]);

  React.useEffect(() => {
    if (id !== null) {
      doListTask({
        projectId: id,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      });
      const reloadListTask = () => {
        doListTask({
          projectId: id,
          timeStart: get(timeRange, 'timeStart')
            ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
            : undefined,
          timeEnd: get(timeRange, 'timeEnd')
            ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
            : undefined,
        });
      }
      CustomEventListener(CREATE_GROUP_TASK, reloadListTask);
      CustomEventListener(COPY_GROUP_TASK, reloadListTask);
      CustomEventListener(UPDATE_GROUP_TASK, reloadListTask);
      CustomEventListener(DELETE_GROUP_TASK, reloadListTask);
      CustomEventListener(SORT_GROUP_TASK, reloadListTask);
      CustomEventListener(CREATE_TASK, reloadListTask);
      CustomEventListener(SORT_TASK, reloadListTask);
      return () => {
        CustomEventDispose(CREATE_GROUP_TASK, reloadListTask);
        CustomEventDispose(COPY_GROUP_TASK, reloadListTask);
        CustomEventDispose(UPDATE_GROUP_TASK, reloadListTask);
        CustomEventDispose(DELETE_GROUP_TASK, reloadListTask);
        CustomEventDispose(SORT_GROUP_TASK, reloadListTask);
        CustomEventDispose(CREATE_TASK, reloadListTask);
        CustomEventDispose(SORT_TASK, reloadListTask);
      }
    }
    // eslint-disable-next-line
  }, [id, timeRange]);

  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [id, 'update_project'], false)) return;
    if (id !== null) {
      doListGroupTask({ projectId: id });
      const reloadListGroupTask = () => {
        doListGroupTask({ projectId: id });
      }
      CustomEventListener(SORT_GROUP_TASK, reloadListGroupTask);
      return () => {
        CustomEventDispose(SORT_GROUP_TASK, reloadListGroupTask);
      }
    }
    // eslint-disable-next-line
  }, [id, viewPermissions]);



  React.useEffect(() => {
    if (!get(viewPermissions.permissions, [id, 'update_project'], false)) return;
    if (id !== null) {
      doGetListTaskDetail({ projectId: id });
      const reloadGetListTaskDetail = () => {
        doGetListTaskDetail({ projectId: id });
      }
      CustomEventListener(CREATE_GROUP_TASK, reloadGetListTaskDetail);
      CustomEventListener(COPY_GROUP_TASK, reloadGetListTaskDetail);
      CustomEventListener(UPDATE_GROUP_TASK, reloadGetListTaskDetail);
      CustomEventListener(DELETE_GROUP_TASK, reloadGetListTaskDetail);
      return () => {
        CustomEventDispose(CREATE_GROUP_TASK, reloadGetListTaskDetail);
        CustomEventDispose(COPY_GROUP_TASK, reloadGetListTaskDetail);
        CustomEventDispose(UPDATE_GROUP_TASK, reloadGetListTaskDetail);
        CustomEventDispose(DELETE_GROUP_TASK, reloadGetListTaskDetail);
      }
    }
    // eslint-disable-next-line
  }, [viewPermissions, id]);

  React.useEffect(() => {
    if (id !== null) {
      doDetailProject({ projectId: id });
      const reloadDetailProject = () => {
        doDetailProject({ projectId: id });
      }
      CustomEventListener(ADD_MEMBER_PROJECT, reloadDetailProject);
      CustomEventListener(REMOVE_MEMBER_PROJECT, reloadDetailProject);
      CustomEventListener(UPDATE_STATE_JOIN_TASK, reloadDetailProject);
      CustomEventListener(ASSIGN_MEMBER_TO_ALL_TASK, reloadDetailProject);
      CustomEventListener(CREATE_TASK, reloadDetailProject);
      CustomEventListener(DELETE_TASK, reloadDetailProject);
      return () => {
        CustomEventDispose(ADD_MEMBER_PROJECT, reloadDetailProject);
        CustomEventDispose(REMOVE_MEMBER_PROJECT, reloadDetailProject);
        CustomEventDispose(UPDATE_STATE_JOIN_TASK, reloadDetailProject);
        CustomEventDispose(ASSIGN_MEMBER_TO_ALL_TASK, reloadDetailProject);
        CustomEventDispose(CREATE_TASK, reloadDetailProject);
        CustomEventDispose(DELETE_TASK, reloadDetailProject);
      }
    }
    // eslint-disable-next-line
  }, [id]);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);
  const [settingProps, setSettingProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE':
        if (get(viewPermissions.permissions, [projectId, 'create_task'], false)) {
          setOpenCreate(true);
        }
        return;
      case 'SETTING':
        setOpenSetting(true);
        setSettingProps(props);
        return;
      case 'ALERT':
        setOpenAlert(true);
        setAlertProps(props);
        return;
      default: return;
    }
  }

  return (
    <>
      <AllTaskTablePresenter
        expand={expand} handleExpand={handleExpand}
        handleSubSlide={handleSubSlide}
        canUpdateProject={get(viewPermissions.permissions, [id, 'update_project'], false)}
        canCreateTask={get(viewPermissions.permissions, [id, 'create_task'], false)}
        showHidePendings={showHidePendings}
        tasks={tasks} project={project}
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
        handleOpenModal={doOpenModal}
        bgColor={bgColor}
        timeType={timeType}
        handleTimeType={type => setTimeType(type)}
        handleTimeRange={(start, end) => setTimeRange({
          timeStart: start,
          timeEnd: end,
        })}
      />
      <CreateJobModal
        isOpen={openCreate}
        setOpen={setOpenCreate}
        isRight={false}
        projectId={projectId}
        doCreateTask={({ data, projectId }) =>
          doCreateTask({
            name: data.name,
            projectId,
            groupTask: data.group_task,
            typeAssign: data.type_assign,
            priority: data.priority,
            description: data.description,
            startDate: data.start_date,
            startTime: data.start_time,
            endDate: data.end_date,
            endTime: data.end_time,
          })
        }
      />
      <ProjectSettingModal
        open={openSetting}
        setOpen={setOpenSetting}
        {...settingProps}
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
    doListGroupTask: ({ projectId }, quite) => dispatch(listGroupTask({ projectId }, quite)),
    doDetailProject: ({ projectId }, quite) => dispatch(detailProject({ projectId }, quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllTaskTable);