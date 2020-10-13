import React from 'react';
import KanbanHeaderPresenter from './presenter';
import { connect } from 'react-redux';
import { actionVisibleDrawerMessage } from 'actions/system/system';
import { setMemberFilter, setVisibleHeader } from 'actions/kanban/setting';
import { memberProject } from 'actions/project/memberProject';
import { detailProject } from 'actions/kanban/detailProject';
import { projectSelector, visibleSelector } from './selectors';
import { get } from 'lodash';

function KanbanPage({
  doActionVisibleDrawerMessage,
  doKanbanDetailProject,
  doMemberProject,
  projectId,
  project,
  visible, doSetVisibleHeader,
  statusFilter, setStatusFilter,
  priorityFilter, setPriorityFilter, 
  doSetMemberFitler,
  handleOpenModal,
}) {

  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    doKanbanDetailProject({ projectId });
    doMemberProject({ projectId });
  }, [projectId]);

  React.useEffect(() => {
    const members = get(project.project, 'members', []);
    const initialMemberFilter = members
      .map(member => get(member, 'id', ''))
    doSetMemberFitler(initialMemberFilter);
  }, [project]);

  return (
    <KanbanHeaderPresenter 
      search={search} handleSearchChange={search => setSearch(search)}
      handleVisibleDrawerMessage={doActionVisibleDrawerMessage}
      project={project.project}
      isOpen={visible} setIsOpen={doSetVisibleHeader}
      statusFilter={statusFilter} setStatusFilter={setStatusFilter}
      priorityFilter={priorityFilter} setPriorityFilter={setPriorityFilter}  
      handleOpenModal={handleOpenModal}
    />
  );
}

const mapStateToProps = state => {
  return {
    project: projectSelector(state),
    visible: visibleSelector(state), 
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
    doKanbanDetailProject: (option, quite = false) => dispatch(detailProject(option, quite)),
    doSetVisibleHeader: visible => dispatch(setVisibleHeader(visible)),
    doSetMemberFitler: memberFilter => dispatch(setMemberFilter(memberFilter)),
    doMemberProject: (option, quite = false) => dispatch(memberProject(option, quite)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanbanPage);