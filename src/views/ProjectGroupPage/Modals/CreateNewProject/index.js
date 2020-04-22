import React from 'react';
import { connect } from 'react-redux';
import { createProject } from '../../../../actions/project/createProject';
import CreateNewProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function CreateNewProject({
  open, setOpen,
  groups,
  doCreateProject,
}) {

  return (
    <CreateNewProjectPresenter
      open={open} setOpen={setOpen}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doCreateProject: ({ name, description, projectGroupId, priority, currency }) => dispatch(createProject({ name, description, projectGroupId, priority, currency })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateNewProject);
