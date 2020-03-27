import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { hideProject } from '../../../../actions/project/hideProject';
import { showProject } from '../../../../actions/project/showProject';
import { createTask } from '../../../../actions/task/createTask';
import { deleteTask } from '../../../../actions/task/deleteTask';
import { sortTask } from '../../../../actions/task/sortTask';
import AlertModal from '../../../../components/AlertModal';
import CreateJobModal from '../../../../views/JobDetailPage/ListPart/ListHeader/CreateJobModal';
import ProjectSettingModal from '../../../ProjectGroupPage/Modals/ProjectSetting';
import { Context as ProjectPageContext } from '../../index';
import AllTaskTablePresenter from './presenters';
import { bgColorSelector, projectSelector, showHidePendingsSelector, tasksSelector } from './selectors';

function AllTaskTable({
  expand, handleExpand,
  bgColor,
  showHidePendings,
  handleSubSlide,
  tasks, project,
  doShowProject, doHideProject,
  doDeleteTask, doCreateTask,
  doSortTask,
}) {

  const {
    setProjectId,
    setTimeRange,
    setStatusProjectId,
    localOptions, setLocalOptions
  } = React.useContext(ProjectPageContext);

  const { projectId } = useParams();

  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  const [timeType, setTimeType] = React.useState(localOptions.timeType);

  React.useEffect(() => {
    setLocalOptions(pastOptions => ({
      ...pastOptions,
      timeType,
    }));
    // eslint-disable-next-line
  }, [timeType]);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openSetting, setOpenSetting] = React.useState(false);
  const [settingProps, setSettingProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE':
        setOpenCreate(true);
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
        setStatusProjectId={setStatusProjectId}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDeleteTask: ({ taskId }) => dispatch(deleteTask({ taskId })),
    doSortTask: ({ taskId, projectId, groupTask, sortIndex }) => dispatch(sortTask({ taskId, projectId, groupTask, sortIndex })),
    doCreateTask: ({ name, projectId, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, }) => dispatch(createTask({ name, projectId, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllTaskTable);