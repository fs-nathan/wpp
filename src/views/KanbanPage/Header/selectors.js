import { createSelector } from 'reselect';

const kanbanDetailProject = state => state.kanban.detailProject;
const memberProject = state => state.project.memberProject;
const kanbanSetting = state => state.kanban.setting;

export const projectSelector = createSelector(
  [kanbanDetailProject, memberProject],
  (kanbanDetailProject, memberProject) => {
    const { data: { project }, loading: detailLoading, error: detailError } = kanbanDetailProject;
    const { data: { membersAdded }, loading: memberLoading, error: memberError } = memberProject;
    return {
      project: {
        ...project,
        members: membersAdded,
      },
      loading: detailLoading || memberLoading,
      error: detailError || memberError,
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