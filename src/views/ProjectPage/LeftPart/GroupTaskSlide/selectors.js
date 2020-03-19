import { createSelector } from 'reselect';
import { find, get } from 'lodash';

const listGroupTask = state => state.groupTask.listGroupTask;
const sortGroupTask = state => state.groupTask.sortGroupTask;
const listTask = state => state.task.listTask;

export const groupTasksSelector = createSelector(
  [listGroupTask, listTask, sortGroupTask],
  (listGroupTask, listTask, sortGroupTask) => {
    const { loading: sortGroupTaskLoading, error: sortGroupTaskError } = sortGroupTask;
    const { data: { groupTasks }, loading: listGroupTaskLoading, error: listGroupTaskError } = listGroupTask;
    const { data: { tasks } } = listTask;
    const newGroupTasks = tasks.map(groupTask => ({
      ...groupTask,
      ...find(groupTasks, { id: get(groupTask, 'id') }),
      number_task: get(groupTask, 'tasks', []).length,
    }));
    return {
      groupTasks: newGroupTasks,
      loading: listGroupTaskLoading || sortGroupTaskLoading,
      error: listGroupTaskError || sortGroupTaskError,
    }
  }
)