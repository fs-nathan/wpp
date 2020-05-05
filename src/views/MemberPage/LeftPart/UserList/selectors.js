import { createSelector } from 'reselect';

const listUserOfGroup = state => state.user.listUserOfGroup;

export const roomsSelector = createSelector(
  [listUserOfGroup],
  (listUserOfGroup) => {
    const { data: { rooms }, loading, error, firstTime } = listUserOfGroup;
    return {
      rooms,
      loading: firstTime ? false : loading,
      error,
      firstTime,
    }
  }
);