import { listProject } from 'actions/project/listProject';
import { detailStatus } from 'actions/project/setting/detailStatus';
import { updateStatusCopy } from 'actions/project/setting/updateStatusCopy';
import { updateStatusDate } from 'actions/project/setting/updateStatusDate';
import { updateStatusView } from 'actions/project/setting/updateStatusView';
import { getPermissionViewDetailProject } from 'actions/viewPermissions';
import { get } from 'lodash';
import moment from 'moment';
import React from 'react';
import { connect } from 'react-redux';
import { Context as ProjectGroupContext } from '../../index';
import ProjectSettingPresenter, { ProjectSettingNoReload as ProjectSettingNoReloadPresenter } from './presenters';
import { permissionSelector, statusSelector } from './selectors';
import './style.scss';

function ProjectSetting({
  curProject = null, permission,
  open, setOpen,
  status,
  doDetailStatus,
  doUpdateStatusCopy, doUpdateStatusDate, doUpdateStatusView,
  doGetPermissionViewDetailProject,
  doReload,
  projectGroupId = undefined,
}) {

  const { timeRange } = React.useContext(ProjectGroupContext);

  React.useLayoutEffect(() => {
    if (get(curProject, 'id')) doGetPermissionViewDetailProject({ projectId: get(curProject, 'id') });
    // eslint-disable-next-line
  }, [curProject])

  React.useEffect(() => {
    if (curProject) {
      doDetailStatus({
        projectId: get(curProject, 'id'),
      });
    }
    // eslint-disable-next-line
  }, [curProject]);

  return (
    <ProjectSettingPresenter
      open={open} setOpen={setOpen}
      curProject={curProject}
      projectGroupId={projectGroupId}
      doReload={() => doReload({
        groupProject: projectGroupId,
        timeStart: get(timeRange, 'timeStart')
          ? moment(get(timeRange, 'timeStart')).format('YYYY-MM-DD')
          : undefined,
        timeEnd: get(timeRange, 'timeEnd')
          ? moment(get(timeRange, 'timeEnd')).format('YYYY-MM-DD')
          : undefined,
      }, get(curProject, 'id'))}
      status={status}
      canChange={{
        date: get(permission, [get(curProject, 'id'), 'update_project'], true),
        copy: get(permission, [get(curProject, 'id'), 'update_project'], true),
        view: true,
      }}
      handleUpdateStatusCopy={status => doUpdateStatusCopy({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusDate={status => doUpdateStatusDate({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusView={status => doUpdateStatusView({ projectId: get(curProject, 'id'), status })}
    />
  )
}

const mapStateToProps = state => {
  return {
    status: statusSelector(state),
    permission: permissionSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doReload: (options, projectId) => {
      dispatch(detailStatus({ projectId }, true));
      options !== null && dispatch(listProject(options, true));
    },
    doDetailStatus: ({ projectId }) => dispatch(detailStatus({ projectId })),
    doUpdateStatusDate: ({ projectId, status }) => dispatch(updateStatusDate({ projectId, status, })),
    doUpdateStatusCopy: ({ projectId, status }) => dispatch(updateStatusCopy({ projectId, status, })),
    doUpdateStatusView: ({ projectId, status }) => dispatch(updateStatusView({ projectId, status, })),
    doGetPermissionViewDetailProject: ({ projectId }, quite) => dispatch(getPermissionViewDetailProject({ projectId }, quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectSetting);

function _ProjectSettingNoReload({
  curProject = null,
  permission,
  open, setOpen,
  status,
  doDetailStatus,
  doUpdateStatusCopy, doUpdateStatusDate, doUpdateStatusView,
  doGetPermissionViewDetailProject,
  doReload,
}) {

  React.useLayoutEffect(() => {
    if (get(curProject, 'id')) doGetPermissionViewDetailProject({ projectId: get(curProject, 'id') });
    // eslint-disable-next-line
  }, [curProject])

  React.useEffect(() => {
    if (curProject) {
      doDetailStatus({
        projectId: get(curProject, 'id'),
      });
    }
    // eslint-disable-next-line
  }, [curProject]);

  return (
    <ProjectSettingNoReloadPresenter
      open={open} setOpen={setOpen}
      curProject={curProject}
      doReload={() => doReload(null, get(curProject, 'id'))}
      status={status}
      canChange={{
        date: get(permission, [get(curProject, 'id'), 'update_project'], true),
        copy: get(permission, [get(curProject, 'id'), 'update_project'], true),
        view: true,
      }}
      handleUpdateStatusCopy={status => doUpdateStatusCopy({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusDate={status => doUpdateStatusDate({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusView={status => doUpdateStatusView({ projectId: get(curProject, 'id'), status })}
    />
  )
}

export const ProjectSettingNoReload = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_ProjectSettingNoReload);