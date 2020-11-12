import { createSelector } from 'reselect';

const kanbanDetailTask = state => state.kanban.detailTask;

export const taskSelector = createSelector(
  [kanbanDetailTask],
  (kanbanDetailTask) => {
    const { data: { task }, loading, error } = kanbanDetailTask;
    return {
      task,
      loading,
      error,
    }
  }
)