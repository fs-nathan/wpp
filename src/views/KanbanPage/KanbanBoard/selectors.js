import { createSelector } from 'reselect';

const kanbanListTask = state => state.kanban.listTask;

export const tasksSelector = createSelector(
  [kanbanListTask],
  (kanbanListTask) => {
    const { data: { tasks }, loading, error } = kanbanListTask;
    return {
      tasks,
      loading,
      error,
    }
  }
)