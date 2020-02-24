import React from 'react';
import { copyProject } from '../../../../actions/project/copyProject';
import { connect } from 'react-redux';
import { get, map, filter } from 'lodash';
import CopyProjectPresenter from './presenters';
import { groupsSelector } from './selectors';

function CopyProject({ 
  open, setOpen, 
  groups, 
  doCopyProject 
}) {

  const [searchPatern, setSearchPatern] = React.useState('');

  const newGroups = map([...groups.groups, {
    name: 'Mặc định',
    id: null,
  }], (projectGroup) => {
    const ownedProjects = filter(
      projectGroup.projects, 
      project => get(project, 'name').toLowerCase().includes(searchPatern.toLowerCase())
    );
    return {
      ...projectGroup,
      projects: ownedProjects,
    };
  });

  return (
    <CopyProjectPresenter 
      open={open} setOpen={setOpen}
      searchPatern={searchPatern} setSearchPatern={setSearchPatern}
      groups={newGroups}
      handleCopyProject={(projectId, name, description, startDate, isCopyMember) => 
        doCopyProject({
          projectId,
          name,
          description,
          startDate,
          isCopyMember,
        })
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
    doCopyProject: ({ projectId, name, description, startDate, isCopyMember }) => dispatch(copyProject({ projectId, name, description, startDate, isCopyMember })),
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CopyProject);
