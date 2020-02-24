import React from 'react';
import { get, sortBy, reverse } from 'lodash';
import { connect } from 'react-redux';
import { projectsSelector } from './selectors';
import DeletedProjectTablePresenter from './presenters';

function DeletedProjectTable({ 
  expand, handleExpand, 
  projects,
}) {

  const [newProjects, setNewProjects] = React.useState(projects);
  const [sortType, setSortType] = React.useState({});

  React.useEffect(() => {
    let _projects = [...projects.projects];
    _projects = sortBy(_projects, [
      o => get(o, sortType.col)
    ])
    _projects = sortType.dir === -1 ? reverse(_projects) : _projects;
    setNewProjects({
      ...projects,
      projects: _projects
    });
  }, [projects, sortType]);

  return (
    <DeletedProjectTablePresenter 
      expand={expand} handleExpand={handleExpand} 
      projects={newProjects}
      handleSortType={type => setSortType(oldType => {
        const newCol = type;
        const newDir = type === oldType.col ? -oldType.dir : 1;
        return {
          newCol,
          newDir
        }
      })}
    />
  )
}

const mapStateToProps = state => {
  return {
    projects: projectsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeletedProjectTable);