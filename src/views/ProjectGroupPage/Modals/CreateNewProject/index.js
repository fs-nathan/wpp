import { createProject } from 'actions/project/createProject';
import { listProjectGroup } from 'actions/projectGroup/listProjectGroup';
import React from 'react';
import { connect } from 'react-redux';
import CreateNewProjectPresenter from './presenters';
import { activeLoadingSelector, groupsSelector } from './selectors';

function CreateNewProject({
  open, setOpen,
  groups,
  doCreateProject,
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
    <CreateNewProjectPresenter
      open={open} setOpen={setOpen} activeLoading={activeLoading}
      groups={groups}
      handleCreateProject={({ name, description, projectGroupId, priority, currency }) =>
        doCreateProject({ name, description, projectGroupId, priority, currency })
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
    doCreateProject: ({ name, description, projectGroupId, priority, currency }) => dispatch(createProject({ name, description, projectGroupId, priority, currency })),
    doListProjectGroup: (quite) => dispatch(listProjectGroup(quite)),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewProject);
