import { createSelector } from 'reselect';

const listLevel = state => state.level.listLevel;

export const levelsSelector = createSelector(
  [listLevel],
  (listLevel) => { 
    const { data: { levels }, loading, error } = listLevel;
    return {
      levels,
      loading,
      error,
    }
  }
);