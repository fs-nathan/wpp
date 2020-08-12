import { deleteTrashProject } from 'actions/project/deleteTrashProject';
import { listDeletedProject } from 'actions/project/listDeletedProject';
import { restoreTrashProject } from 'actions/project/restoreTrashProject';
import { get, reverse, sortBy } from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { routeSelector } from '../../selectors';
import DeletedProjectTablePresenter from './presenters';
import { pendingsSelector, projectsSelector } from './selectors';
import { useLocation } from 'react-router-dom';

function DeletedProjectTable({
  expand, handleExpand,
  projects, route, pendings,
  doDeleteTrashProject, doRestoreTrashProject,
  doListDeletedProject,
}) {

  React.useEffect(() => {
    doListDeletedProject({});
  }, []);

  const [newProjects, setNewProjects] = React.useState(projects);
  const [sortType, setSortType] = React.useState({});
  const [groupID, setGroupID] = React.useState(null);
  const search = useLocation().search;

  React.useEffect(() => {
    let searchParams = new URLSearchParams(search);
    setGroupID(searchParams.get("group_id"));
  }, [search]);

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
      projects={newProjects} pendings={pendings}
      handleSortType={type => setSortType(oldType => {
        const newCol = type;
        const newDir = type === oldType.col ? -oldType.dir : 1;
        return {
          col: newCol,
          dir: newDir,
        }
      })}
      handleDelete={projectId => doDeleteTrashProject({ projectId })}
      handleRestore={projectId => doRestoreTrashProject({ projectId })}
    />
  )
}

const mapStateToProps = state => {
  return {
    projects: projectsSelector(state),
    route: routeSelector(state),
    pendings: pendingsSelector(state),
  }
}

const mapDispatchToProps = dispatch => {
  return {
    doDeleteTrashProject: ({ projectId }) => dispatch(deleteTrashProject({ projectId })),
    doRestoreTrashProject: ({ projectId }) => dispatch(restoreTrashProject({ projectId })),
    doListDeletedProject: (options, quite) => dispatch(listDeletedProject(options, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DeletedProjectTable);