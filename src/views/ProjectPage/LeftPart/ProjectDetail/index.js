import { deleteProject } from 'actions/project/deleteProject';
import { detailProject } from 'actions/project/detailProject';
import { listTask } from 'actions/task/listTask';
import { CREATE_TASK, CustomEventDispose, CustomEventListener, DELETE_PROJECT, DELETE_TASK, SORT_GROUP_TASK, SORT_TASK } from 'constants/events';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { ProjectDeleteNoReload as DeleteProjectModal } from '../../../ProjectGroupPage/Modals/DeleteProject';
import { EditProjectNoReload as EditProjectModal } from '../../../ProjectGroupPage/Modals/EditProject';
import { routeSelector } from '../../../ProjectGroupPage/selectors';
import { Context as ProjectContext } from '../../index';
import ProjectDetailPresenter from './presenters';
import { projectSelector } from './selectors';

function ProjectDetail({
  project, route,
  doDeleteProject,
  doListTask,
  doDetailProject,
}) {

  const {
    timeRange, doGetPermissionViewDetailProject,
  } = React.useContext(ProjectContext);
  const [id, setId] = React.useState(null);
  const { projectId } = useParams();

  React.useLayoutEffect(() => {
    doGetPermissionViewDetailProject({ projectId });
    // eslint-disable-next-line
  }, [projectId]);

  React.useEffect(() => {
    setId(projectId);
  }, [projectId]);

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
      CustomEventListener(SORT_GROUP_TASK, reloadListTask);
      CustomEventListener(CREATE_TASK, reloadListTask);
      CustomEventListener(SORT_TASK, reloadListTask);
      return () => {
        CustomEventDispose(SORT_GROUP_TASK, reloadListTask);
        CustomEventDispose(CREATE_TASK, reloadListTask);
        CustomEventDispose(SORT_TASK, reloadListTask);
      }
    }
    // eslint-disable-next-line
  }, [id, timeRange]);

  React.useEffect(() => {
    if (id !== null) {
      doDetailProject({ projectId: id });
      const reloadDetailProject = () => {
        doDetailProject({ projectId: id });
      }
      CustomEventListener(CREATE_TASK, reloadDetailProject);
      CustomEventListener(DELETE_TASK, reloadDetailProject);
      return () => {
        CustomEventDispose(CREATE_TASK, reloadDetailProject);
        CustomEventDispose(DELETE_TASK, reloadDetailProject);
      }
    }
    // eslint-disable-next-line
  }, [id]);

  const history = useHistory();

  React.useEffect(() => {
    const historyPushHandler = () => {
      history.push(route);
    };

    CustomEventListener(DELETE_PROJECT.SUCCESS, historyPushHandler);

    return () => {
      CustomEventDispose(DELETE_PROJECT.SUCCESS, historyPushHandler);
    };
  }, [history, projectId, route]);

  const [openUpdate, setOpenUpdate] = React.useState(false);
  const [updateProps, setUpdateProps] = React.useState({});
  const [openAlert, setOpenAlert] = React.useState(false);
  const [alertProps, setAlertProps] = React.useState({});

  function doOpenModal(type, props) {
    switch (type) {
      case 'UPDATE': {
        setOpenUpdate(true);
        setUpdateProps(props);
        return;
      }
      case 'ALERT': {
        setOpenAlert(true);
        setAlertProps(props);
        return;
      }
      default: return;
    }
  }

  return (
    <>
      <ProjectDetailPresenter
        project={project} route={route}
        handleDeleteProject={(project) =>
          doDeleteProject({ projectId: get(project, 'id') })
        }
        handleOpenModal={doOpenModal}
      />
      <EditProjectModal
        open={openUpdate}
        setOpen={setOpenUpdate}
        {...updateProps}
      />
      <DeleteProjectModal
        open={openAlert}
        setOpen={setOpenAlert}
        {...alertProps}
      />
    </>
  )
}

const mapStateToProps = state => {
  return {
    project: projectSelector(state),
    route: routeSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId })),
    doListTask: ({ projectId, timeStart, timeEnd, }, quite) => dispatch(listTask({ projectId, timeStart, timeEnd, }, quite)),
    doDetailProject: ({ projectId }, quite) => dispatch(detailProject({ projectId }, quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDetail);
