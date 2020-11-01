import React from 'react';
import KanbanHeaderPresenter from './presenter';
import { connect } from 'react-redux';
import { actionVisibleDrawerMessage } from 'actions/system/system';
import { setMemberFilter, setVisibleHeader } from 'actions/kanban/setting';
import { memberProject } from 'actions/project/memberProject';
import { detailProject as kanbanDetailProject } from 'actions/kanban/detailProject';
import { detailProject } from 'actions/project/detailProject';
import { showProject } from 'actions/project/showProject';
import { hideProject } from 'actions/project/hideProject';
import { getProjectListBasic } from "actions/taskDetail/taskDetailActions";
import { projectSelector, visibleSelector, showHidePendingsSelector } from './selectors';
import { CustomEventDispose, CustomEventListener, UPDATE_PROJECT } from 'constants/events.js';
import { get } from 'lodash';

function KanbanPage({
  doActionVisibleDrawerMessage,
  doKanbanDetailProject, doDetailProject,
  doMemberProject,
  projectId,
  project,
  visible, doSetVisibleHeader,
  statusFilter, setStatusFilter,
  priorityFilter, setPriorityFilter, 
  doSetMemberFitler,
  handleOpenModal,
  doShowProject, doHideProject,
  showHidePendings,
  doGetProjectListBasic,
}) {

  const [search, setSearch] = React.useState('');

  React.useEffect(() => {
    doKanbanDetailProject({ projectId });
    doMemberProject({ projectId });
    doDetailProject({ projectId });
  }, [projectId]);

  React.useLayoutEffect(() => {
    doGetProjectListBasic(projectId);
    const handleGetProjectListBasic = () => {
      doGetProjectListBasic(projectId);
    };
    CustomEventListener(UPDATE_PROJECT.SUCCESS, handleGetProjectListBasic);
    return () => {
      CustomEventDispose(UPDATE_PROJECT.SUCCESS, handleGetProjectListBasic);
    }
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
      handleShowOrHideProject={project =>
        get(project, 'visibility', false)
          ? doHideProject({ projectId: get(project, 'id') })
          : doShowProject({ projectId: get(project, 'id') })
      }
      showHidePendings={showHidePendings}
    />
  );
}

const mapStateToProps = state => {
  return {
    project: projectSelector(state),
    visible: visibleSelector(state), 
    showHidePendings: showHidePendingsSelector(state),
  }
};

const mapDispatchToProps = dispatch => {
  return {
    doHideProject: ({ projectId }) => dispatch(hideProject({ projectId })),
    doShowProject: ({ projectId }) => dispatch(showProject({ projectId })),
    doActionVisibleDrawerMessage: (option) => dispatch(actionVisibleDrawerMessage(option)),
    doKanbanDetailProject: (option, quite) => dispatch(kanbanDetailProject(option, quite)),
    doDetailProject: (option, quite) => dispatch(detailProject(option, quite)),
    doSetVisibleHeader: visible => dispatch(setVisibleHeader(visible)),
    doSetMemberFitler: memberFilter => dispatch(setMemberFilter(memberFilter)),
    doMemberProject: (option, quite) => dispatch(memberProject(option, quite)),
    doGetProjectListBasic: (projectId) => dispatch(getProjectListBasic(projectId)),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(KanbanPage);