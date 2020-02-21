import { createSelector } from 'reselect';

const detailProject = state => state.project.detailProject;

export const projectSelector = createSelector(
  [detailProject],
  (detailProject) => {
    const { data: { project }, error, loading } = detailProject;
    return {
      project,
      loading,
      error,
    }
  }
);