import { createSelector } from 'reselect';
import { concat } from 'lodash';

const kanbanDetailProject = state => state.kanban.detailProject;
const memberProject = state => state.project.memberProject;
const detailProject = state => state.project.detailProject;
const kanbanSetting = state => state.kanban.setting;
const showProject = state => state.project.showProject;
const hideProject = state => state.project.hideProject;

export const projectSelector = createSelector(
  [kanbanDetailProject, memberProject, detailProject],
  (kanbanDetailProject, memberProject, detailProject) => {
    const { data: { project: kanbanProject }, loading: kanbanDetailLoading, error: kanbanDetailError } = kanbanDetailProject;
    const { data: { membersAdded }, loading: memberLoading, error: memberError } = memberProject;
    const { data: { project }, loading: detailLoading, error: detailError } = detailProject;
    return {
      project: {
        ...project,
        ...kanbanProject,
        members: membersAdded,
      },
      loading: detailLoading || kanbanDetailLoading || memberLoading,
      error: detailError || kanbanDetailError || memberError,
    }
  }
)

export const visibleSelector = createSelector(
  [kanbanSetting],
  (kanbanSetting) => {
    const { setting: { visible } } = kanbanSetting;
    return visible;
  }
);

export const showHidePendingsSelector = createSelector(
  [showProject, hideProject],
  (showProject, hideProject) => {
    const { pendings: showPendings, erorr: showError } = showProject;
    const { pendings: hidePendings, erorr: hideError } = hideProject;
    return {
      pendings: concat(showPendings, hidePendings),
      error: showError || hideError,
    }
  }
)