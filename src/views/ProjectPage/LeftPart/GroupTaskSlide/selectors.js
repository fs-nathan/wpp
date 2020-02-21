import { createSelector } from 'reselect';

const listGroupTask = state => state.groupTask.listGroupTask;

export const groupTasksSelector = createSelector(
  [listGroupTask],
  (listGroupTask) => {
    const { data: { groupTasks }, loading, error } = listGroupTask;
    return {
      groupTasks,
      loading,
      error
    }
  }
)