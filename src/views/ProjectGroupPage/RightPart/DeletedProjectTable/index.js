import { get, reverse, sortBy } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { routeSelector } from '../../selectors';
import DeletedProjectTablePresenter from './presenters';
import { projectsSelector } from './selectors';

function DeletedProjectTable({
  expand, handleExpand,
  projects, route,
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
      expand={expand} handleExpand={handleExpand} route={route}
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
    route: routeSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeletedProjectTable);