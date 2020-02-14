import { createSelector } from 'reselect';

const listMajor = state => state.major.listMajor;

export const majorsSelector = createSelector(
  [listMajor],
  (listMajor) => {
    const { data: { majors }, loading, error } = listMajor;
    return {
      majors,
      loading,
      error,
    }
  }
);