import { createSelector } from 'reselect';

const listUserOfGroup = state => state.user.listUserOfGroup;

export const roomsSelector = createSelector(
  [listUserOfGroup],
  (listUserOfGroup) => {
    const { data: { rooms }, loading, error } = listUserOfGroup;
    return {
      rooms,
      loading,
      error,
    }
  }
);