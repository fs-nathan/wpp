import React from 'react';
import KanbanHeaderPresenter from './presenter';
import { connect } from 'react-redux';
import { actionVisibleDrawerMessage } from 'actions/system/system';
import { detailProject } from 'actions/kanban/detailProject';
import { projectSelector } from './selectors';

function KanbanPage({
  doActionVisibleDrawerMessage,
  doKanbanDetailProject,
  projectId,
  project,
  isOpen, setIsOpen,
}) {

  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    doKanbanDetailProject({ projectId });
  }, [projectId]);

  return (
    <KanbanHeaderPresenter 
      search={search} handleSearchChange={search => setSearch(search)}
      handleVisibleDrawerMessage={oldOptions => doActionVisibleDrawerMessage({
        ...oldOptions,
        options: {
          projectId,
        },
      })}
      project={project.project}
      isOpen={isOpen} setIsOpen={setIsOpen}
    />
  );
}

const mapStateToProps = state => {
  return {
    project: projectSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
    doKanbanDetailProject: (option, quite = false) => dispatch(detailProject(option, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanbanPage);