import { updateProject } from 'actions/project/updateProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import EditProjectPresenter from './presenters';
import { activeLoadingSelector, groupsSelector } from './selectors';

function EditProject({
  curProject = null,
  open, setOpen,
  groups,
  doUpdateProject,
  doListProjectGroup,
  activeLoading,
}) {

  React.useEffect(() => {
    if (open) {
      doListProjectGroup();
    }
    // eslint-disable-next-line
  }, [open]);

  return (
    <EditProjectPresenter
      curProject={curProject}
      activeLoading={activeLoading}
      open={open} setOpen={setOpen}
      groups={groups}
      handleEditProject={({ name, description, projectGroupId, priority, currency }) =>
        doUpdateProject({ projectId: get(curProject, 'id'), name, description, projectGroupId, priority, currency })
      }
    />
  )
}

const mapStateToProps = state => {
  return {
    groups: groupsSelector(state),
    activeLoading: activeLoadingSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doUpdateProject: ({ projectId, name, description, projectGroupId, priority, currency }) => dispatch(updateProject({ projectId, name, description, projectGroupId, priority, currency })),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProject);
