import { createSelector } from 'reselect';

const getAllGroupTask = state => state.groupTask.getAllGroupTask;
const copyGroupTask = state => state.groupTask.copyGroupTask;

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
)

export const activeLoadingSelector = createSelector(
  [copyGroupTask],
  (copyGroupTask) => {
    const { loading } = copyGroupTask;
    return loading;
  }
);