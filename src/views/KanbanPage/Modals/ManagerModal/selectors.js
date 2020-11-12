import { createSelector } from 'reselect';

const kanbanGetManager = state => state.kanban.getManager;

export const managersSelector = createSelector(
  [kanbanGetManager],
  (kanbanGetManager) => {
    const { data: { managers }, loading, error } = kanbanGetManager;
    return {
      managers,
      loading,
      error,
    }
  }
)