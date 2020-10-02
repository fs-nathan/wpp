import { createSelector } from 'reselect';

const kanbanDetailProject = state => state.kanban.detailProject;

export const projectSelector = createSelector(
  [kanbanDetailProject],
  (kanbanDetailProject) => {
    const { data: { project }, loading, error } = kanbanDetailProject;
    return {
      project,
      loading,
      error,
    }
  }
)