import { createSelector } from 'reselect';

const listDeletedProject = state => state.project.listDeletedProject;

export const projectsSelector = createSelector(
  [listDeletedProject],
  (listDeletedProject) => {
    const { data: { projects }, loading, error } = listDeletedProject;
    return {
      projects,
      loading,
      error,
    }
  }
)