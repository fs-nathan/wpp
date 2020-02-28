import React from 'react';
import { get } from 'lodash';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Context as ProjectPageContext } from '../../index';
import AlertModal from '../../../../components/AlertModal';
import CreateNewTaskModal from '../../Modals/CreateNewTask';
import { hideProject } from '../../../../actions/project/hideProject';
import { showProject } from '../../../../actions/project/showProject';
import { deleteTask } from '../../../../actions/task/deleteTask';
import { sortTask } from '../../../../actions/task/sortTask';
import { tasksSelector, projectSelector, bgColorSelector } from './selectors';
import AllTaskTablePresenter from './presenters';

function AllTaskTable({ 
  expand, handleExpand, 
  bgColor,
  handleSubSlide,
  tasks, project,
  doShowProject, doHideProject,
  doDeleteTask,
  doSortTask,
}) {

  const { setProjectId, setTimeRange } = React.useContext(ProjectPageContext);
  const { projectId } = useParams();

  React.useEffect(() => {
    setProjectId(projectId);
  }, [setProjectId, projectId]);

  const [timeType, setTimeType] = React.useState(5);

  const [openCreate, setOpenCreate] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'CREATE': 
        setOpenCreate(true);
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
            groupTask,
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
      <CreateNewTaskModal 
        open={openCreate} 
        setOpen={setOpenCreate}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doDeleteTask: ({ taskId }) => dispatch(deleteTask({ taskId })),
    doSortTask: ({ taskId, projectId, groupTask, sortIndex }) => dispatch(sortTask({ taskId, projectId, groupTask, sortIndex })),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AllTaskTable);