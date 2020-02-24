import { createSelector } from 'reselect';

const listPosition = state => state.position.listPosition;

export const positionsSelector = createSelector(
  [listPosition],
  (listPosition) => {
    const { data: { positions }, loading, error } = listPosition;  
    return {
      positions,
      loading,
      error,
    }
  }
);