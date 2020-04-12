import { find, get } from 'lodash';
import { createSelector } from 'reselect';

const listGroupTask = state => state.groupTask.listGroupTask;
const createGroupTask = state => state.groupTask.createGroupTask;
const copyGroupTask = state => state.groupTask.copyGroupTask;
const deleteGroupTask = state => state.groupTask.deleteGroupTask;
const updateGroupTask = state => state.groupTask.updateGroupTask;
const sortGroupTask = state => state.groupTask.sortGroupTask;
const listTask = state => state.task.listTask;

export const groupTasksSelector = createSelector(
  [listGroupTask, listTask, sortGroupTask, createGroupTask, deleteGroupTask, updateGroupTask, copyGroupTask],
  (listGroupTask, listTask, sortGroupTask, createGroupTask, deleteGroupTask, updateGroupTask, copyGroupTask) => {
    const { loading: sortGroupTaskLoading, error: sortGroupTaskError } = sortGroupTask;
    const { data: { groupTasks }, loading: listGroupTaskLoading, error: listGroupTaskError } = listGroupTask;
    const { data: { tasks } } = listTask;
    const { loading: createLoading, error: createError } = createGroupTask;
    const { loading: deleteLoading, error: deleteError } = deleteGroupTask;
    const { loading: updateLoading, error: updateError } = updateGroupTask;
    const { loading: copyLoading, error: copyError } = copyGroupTask;
    const newGroupTasks = groupTasks.map(groupTask => ({
      ...groupTask,
      tasks: get(find(tasks, { id: get(tasks, 'id') }), 'tasks', []),
      number_task: get(find(tasks, { id: get(tasks, 'id') }), 'tasks', []).length,
    }));
    return {
      groupTasks: newGroupTasks,
      loading: listGroupTaskLoading || sortGroupTaskLoading || copyLoading
        || createLoading || deleteLoading || updateLoading,
      error: listGroupTaskError || sortGroupTaskError || copyError
        || createError || deleteError || updateError,
    }
  }
)