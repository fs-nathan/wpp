import React from 'react';
import { detailStatus } from '../../../../actions/project/setting/detailStatus';
import { updateStatusCopy } from '../../../../actions/project/setting/updateStatusCopy';
import { updateStatusDate } from '../../../../actions/project/setting/updateStatusDate';
import { connect } from 'react-redux';
import { Context as ProjectPageContext } from '../../index';
import './style.scss';
import { statusSelector } from './selectors';
import { get } from 'lodash';
import ProjectSettingPresenter from './presenters';

function ProjectSetting({ 
  curProject = null,
  open, setOpen,
  status,
  doUpdateStatusCopy, doUpdateStatusDate,
}) {

  const { setStatusProjectId } = React.useContext(ProjectPageContext);

  React.useEffect(() => {
    if (curProject) setStatusProjectId(get(curProject, 'id'))
  }, [setStatusProjectId, curProject]);

  return (
    <ProjectSettingPresenter 
      open={open} setOpen={setOpen}
      status={status}
      handleUpdateStatusCopy={status => doUpdateStatusCopy({ projectId: get(curProject, 'id'), status })}
      handleUpdateStatusDate={status => doUpdateStatusDate({ projectId: get(curProject, 'id'), status })}
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
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProjectSetting);
