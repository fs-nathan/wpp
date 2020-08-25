import { find, get, remove } from 'lodash';
import { createSelector } from 'reselect';

const listGroupTask = state => state.groupTask.listGroupTask;
const sortGroupTask = state => state.groupTask.sortGroupTask;
const listTask = state => state.task.listTask;

export const groupTasksSelector = createSelector(
  [listGroupTask, listTask, sortGroupTask],
  (listGroupTask, listTask, sortGroupTask) => {
    const { loading: sortGroupTaskLoading, error: sortGroupTaskError } = sortGroupTask;
    const { data: { groupTasks }, loading: listGroupTaskLoading, error: listGroupTaskError, firstTime } = listGroupTask;
    const { data: { tasks } } = listTask;
    let newGroupTasks = groupTasks;
    remove(groupTasks, { id: 'default' });
    newGroupTasks.map(groupTask => ({
      ...groupTask,
      tasks: get(find(tasks, { id: get(tasks, 'id') }), 'tasks', []),
      number_task: get(find(tasks, { id: get(tasks, 'id') }), 'tasks', []).length,
    }));
    return {
      groupTasks: newGroupTasks,
      loading: (firstTime ? false : listGroupTaskLoading) || sortGroupTaskLoading,
      error: listGroupTaskError || sortGroupTaskError,
      firstTime
    }
  }
)