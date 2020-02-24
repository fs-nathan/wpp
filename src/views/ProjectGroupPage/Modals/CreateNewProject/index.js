import React from 'react';
import { createProject } from '../../../../actions/project/createProject';
import { connect } from 'react-redux';
import { groupsSelector } from './selectors';
import CreateNewProjectPresenter from './presenters';

function CreateNewProject({ 
  open, setOpen, 
  groups,
  doCreateProject, 
}) {

  const newGroups = {
    ...groups,
    groups: [{ id: '__default__', name: 'Chưa phân loại' }, ...groups.groups],
  };

  return (
    <CreateNewProjectPresenter 
      open={open} setOpen={setOpen} 
      groups={newGroups}
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
