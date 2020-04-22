import { get } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { updateProject } from '../../../../actions/project/updateProject';
import EditProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function EditProject({
  curProject = null,
  open, setOpen,
  groups,
  doUpdateProject
}) {

  return (
    <EditProjectPresenter
      curProject={curProject}
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
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doUpdateProject: ({ projectId, name, description, projectGroupId, priority, currency }) => dispatch(updateProject({ projectId, name, description, projectGroupId, priority, currency })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditProject);
