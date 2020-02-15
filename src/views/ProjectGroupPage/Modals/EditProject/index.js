import React from 'react';
import { updateProject } from '../../../../actions/project/updateProject';
import { connect } from 'react-redux';
import { groupsSelector } from './selectors';
import EditProjectPresenter from './presenters';
import { get } from 'lodash';

function EditProject({ 
  curProject = null, 
  open, setOpen, 
  groups, 
  doUpdateProject
}) {


  const newGroups = {
    ...groups,
    groups: [{ id: '__default__', name: 'Chưa phân loại' }, ...groups.groups],
  }

  return (
    <EditProjectPresenter 
      curProject={curProject} 
      open={open} setOpen={setOpen}
      groups={newGroups}
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
