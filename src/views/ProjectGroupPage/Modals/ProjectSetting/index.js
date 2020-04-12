import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { detailStatus } from '../../../../actions/project/setting/detailStatus';
import { updateStatusCopy } from '../../../../actions/project/setting/updateStatusCopy';
import { updateStatusDate } from '../../../../actions/project/setting/updateStatusDate';
import { updateStatusView } from '../../../../actions/project/setting/updateStatusView';
import ProjectSettingPresenter from './presenters';
import { statusSelector } from './selectors';
import './style.scss';

function ProjectSetting({
  curProject = null, canChange = null,
  open, setOpen,
  status,
  doUpdateStatusCopy, doUpdateStatusDate, doUpdateStatusView,
  setStatusProjectId = () => null,
}) {

  React.useEffect(() => {
    if (curProject) setStatusProjectId(get(curProject, 'id'))
  }, [setStatusProjectId, curProject]);

  return (
    <ProjectSettingPresenter
      open={open} setOpen={setOpen}
      status={status}
      canChange={canChange}
      handleUpdateStatusCopy={status => doUpdateStatusCopy({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusDate={status => doUpdateStatusDate({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusView={status => doUpdateStatusView({ projectId: get(curProject, 'id'), status })}
    />
  )
}

const mapStateToProps = state => {
  return {
    status: statusSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doDetailStatus: ({ projectId }) => dispatch(detailStatus({ projectId })),
    doUpdateStatusDate: ({ projectId, status }) => dispatch(updateStatusDate({ projectId, status, })),
    doUpdateStatusCopy: ({ projectId, status }) => dispatch(updateStatusCopy({ projectId, status, })),
    doUpdateStatusView: ({ projectId, status }) => dispatch(updateStatusView({ projectId, status, })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectSetting);
