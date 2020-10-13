import { createSelector } from 'reselect';

const kanbanListTask = state => state.kanban.listTask;
const kanbanSortTask = state => state.kanban.sortTask;
const kanbanSortGroupTask = state => state.kanban.sortGroupTask;

export const tasksSelector = createSelector(
  [kanbanListTask, kanbanSortTask, kanbanSortGroupTask],
  (kanbanListTask, kanbanSortTask, kanbanSortGroupTask) => {
    const { data: { tasks }, loading: listLoading, error: listError } = kanbanListTask;
    const { loading: sortLoading, error: sortError } = kanbanSortTask;
    const { loading: sortGroupLoading, error: sortGroupError } = kanbanSortGroupTask;
    return {
      tasks,
      loading: listLoading || sortLoading || sortGroupLoading,
      error: listError || sortError || sortGroupError,
    }
  }
)