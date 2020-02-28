import { createSelector } from 'reselect';

const listTask = state => state.task.listTask;
const detailProject = state => state.project.detailProject;

export const tasksSelector = createSelector(
  [listTask],
  (listTask) => {
    const { data: { tasks }, loading, error } = listTask;
    return {
      tasks,
      loading,
      error,
    }
  }
);

export const projectSelector = createSelector(
  [detailProject],
  (detailProject) => {
    const { data: { project }, loading, error } = detailProject;
    return {
      project,
      loading,
      error,
    }
  }
);