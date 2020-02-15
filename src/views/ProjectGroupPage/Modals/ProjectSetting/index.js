import React from 'react';
import { detailStatus } from '../../../../actions/project/setting/detailStatus';
import { updateStatusCopy } from '../../../../actions/project/setting/updateStatusCopy';
import { updateStatusDate } from '../../../../actions/project/setting/updateStatusDate';
import { connect } from 'react-redux';
import { Context as ProjectPageContext } from '../../index';
import './style.scss';
import { statusSelector } from './selectors';
import ProjectSettingPresenter from './presenters';

function ProjectSetting({ 
  open, setOpen,
  status,
  doUpdateStatusCopy, doUpdateStatusDate,
}) {

  const { statusProjectId: projectId } = React.useContext(ProjectPageContext);

  console.log(status);

  return (
    <ProjectSettingPresenter 
      open={open} setOpen={setOpen}
      status={status}
      handleUpdateStatusCopy={status => doUpdateStatusCopy({ projectId, status })}
      handleUpdateStatusDate={status => doUpdateStatusDate({ projectId, status })}
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
