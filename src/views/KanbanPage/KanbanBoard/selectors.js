import { createSelector } from 'reselect';
import { find, get } from 'lodash';

const kanbanListTask = state => state.kanban.listTask;
const kanbanSortTask = state => state.kanban.sortTask;
const kanbanSortGroupTask = state => state.kanban.sortGroupTask;
const listGroupTask = state => state.groupTask.listGroupTask;

export const tasksSelector = createSelector(
  [kanbanListTask, kanbanSortTask, kanbanSortGroupTask, listGroupTask],
  (kanbanListTask, kanbanSortTask, kanbanSortGroupTask, listGroupTask) => {
    const { data: { tasks }, loading: listLoading, error: listError } = kanbanListTask;
    const { data: { groupTasks }, loading: listGroupTaskLoading, error: listGroupTaskError } = listGroupTask;
    const { loading: sortLoading, error: sortError } = kanbanSortTask;
    const { loading: sortGroupLoading, error: sortGroupError } = kanbanSortGroupTask;
    const newTasks = groupTasks.map(groupTask => ({
      ...groupTask,
      ...find(tasks, { id: get(groupTask, 'id') }),
    }));
    return {
      tasks: newTasks,
      loading: listLoading || sortLoading || sortGroupLoading || listGroupTaskLoading,
      error: listError || sortError || sortGroupError || listGroupTaskError,
    }
  }
)