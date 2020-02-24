import { createSelector } from 'reselect';

const listRoom = state => state.room.listRoom;

export const roomsSelector = createSelector(
  [listRoom],
  (listRoom) => {
    const { data: { rooms }, loading, error } = listRoom;
    return ({
      rooms,
      loading,
      error,
    });
  }
);