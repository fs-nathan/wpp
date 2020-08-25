import { createSelector } from 'reselect';

const getAllGroupTask = state => state.groupTask.getAllGroupTask;

export const groupTasksSelector = createSelector(
  [getAllGroupTask],
  (getAllGroupTask) => {
    const { data: { groupTasks }, loading, error, firstTime } = getAllGroupTask;
    return {
      groupTasks,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    }
  }
);