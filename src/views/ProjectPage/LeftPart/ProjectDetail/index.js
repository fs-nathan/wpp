import { deleteProject } from 'actions/project/deleteProject';
import { detailProject } from 'actions/project/detailProject';
import { listTask } from 'actions/task/listTask';
import { getPermissionViewDetailProject } from 'actions/viewPermissions';
import { useTimes } from 'components/CustomPopover';
import { CREATE_TASK, CustomEventDispose, CustomEventListener, DELETE_PROJECT, DELETE_TASK, SORT_GROUP_TASK, SORT_TASK } from 'constants/events';
import { get, find } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import DeleteProjectModal from '../../../ProjectGroupPage/Modals/DeleteProject';
import EditProjectModal from '../../../ProjectGroupPage/Modals/EditProject';
import { routeSelector } from '../../../ProjectGroupPage/selectors';
import { localOptionSelector } from '../../selectors';
import ProjectDetailPresenter from './presenters';
import { projectSelector } from './selectors';
import {groupsSelector} from "../../../ProjectGroupPage/LeftPart/ProjectGroupList/selectors";

function ProjectDetail({
  project, route,
  doDeleteProject,
  doListTask,
  doDetailProject,
  doGetPermissionViewDetailProject,
  localOption, groups
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
  const { projectId } = useParams();

  React.useLayoutEffect(() => {
    doGetPermissionViewDetailProject({ projectId });
  }, [projectId]);

  React.useEffect(() => {
    if (projectId !== null) {
      doListTask({
        projectId: projectId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      });
      const reloadListTask = () => {
        doListTask({
          projectId: projectId,
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
  }, [projectId, timeRange]);

  React.useEffect(() => {
    if (projectId !== null) {
      doDetailProject({ projectId: projectId });
      const reloadDetailProject = () => {
        doDetailProject({ projectId: projectId });
      }
      CustomEventListener(CREATE_TASK, reloadDetailProject);
      CustomEventListener(DELETE_TASK, reloadDetailProject);
      return () => {
        CustomEventDispose(CREATE_TASK, reloadDetailProject);
        CustomEventDispose(DELETE_TASK, reloadDetailProject);
      }
    }
  }, [projectId]);

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
    localOption: localOptionSelector(state),
  };
};

const mapDispatchToProps = dispatch => {
  return {
    doDeleteProject: ({ projectId }) => dispatch(deleteProject({ projectId })),
    doListTask: ({ projectId, timeStart, timeEnd, }, quite) => dispatch(listTask({ projectId, timeStart, timeEnd, }, quite)),
    doDetailProject: ({ projectId }, quite) => dispatch(detailProject({ projectId }, quite)),
    doGetPermissionViewDetailProject: ({ projectId }, quite) => dispatch(getPermissionViewDetailProject({ projectId }, quite)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectDetail);
