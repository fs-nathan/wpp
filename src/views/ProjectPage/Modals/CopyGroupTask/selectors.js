import { createSelector } from 'reselect';

const getAllGroupTask = state => state.groupTask.getAllGroupTask;

export const groupTasksSelector = createSelector(
  [getAllGroupTask],
  (getAllGroupTask) => {
    const { data: { groupTasks }, loading, error } = getAllGroupTask;
    return {
      groupTasks,
      loading,
      error,
    }
  }
)