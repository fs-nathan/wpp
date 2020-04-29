import { detailStatus } from 'actions/project/setting/detailStatus';
import { updateStatusCopy } from 'actions/project/setting/updateStatusCopy';
import { updateStatusDate } from 'actions/project/setting/updateStatusDate';
import { updateStatusView } from 'actions/project/setting/updateStatusView';
import { getPermissionViewDetailProject } from 'actions/viewPermissions';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import ProjectSettingPresenter from './presenters';
import { permissionSelector, statusSelector } from './selectors';
import './style.scss';

function ProjectSetting({
  curProject = null, permission,
  open, setOpen,
  status,
  doDetailStatus,
  doUpdateStatusCopy, doUpdateStatusDate, doUpdateStatusView,
  doGetPermissionViewDetailProject,
}) {

  React.useLayoutEffect(() => {
    if (get(curProject, 'id')) doGetPermissionViewDetailProject({ projectId: get(curProject, 'id') });
    // eslint-disable-next-line
  }, [curProject])

  React.useEffect(() => {
    if (open) {
      if (curProject) {
        doDetailStatus({
          projectId: get(curProject, 'id'),
        });
      }
    }
    // eslint-disable-next-line
  }, [open, curProject]);

  return (
    <ProjectSettingPresenter
      open={open} setOpen={setOpen}
      status={status}
      canChange={{
        date: get(permission, [get(curProject, 'id'), 'update_project'], false),
        copy: get(permission, [get(curProject, 'id'), 'update_project'], false),
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
