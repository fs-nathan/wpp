import { createSelector } from 'reselect';
import { find, get } from 'lodash';

const listGroupTask = state => state.groupTask.listGroupTask;
const listTask = state => state.task.listTask;

export const groupTasksSelector = createSelector(
  [listGroupTask, listTask],
  (listGroupTask, listTask) => {
    const { data: { groupTasks }, loading: listGroupTaskLoading, error: listGroupTaskError } = listGroupTask;
    const { data: { tasks }, loading: listTaskLoading, error: listTaskError } = listTask;
    const newGroupTasks = groupTasks.map(groupTask => ({
      ...groupTask,
      number_task: get(
        find(tasks, { id: get(groupTask, 'id') }),
        'tasks',
        []
      ).length,
    }));
    return {
      groupTasks: newGroupTasks,
      loading: listTaskLoading || listGroupTaskLoading,
      error: listTaskError || listGroupTaskError,
    }
  }
)