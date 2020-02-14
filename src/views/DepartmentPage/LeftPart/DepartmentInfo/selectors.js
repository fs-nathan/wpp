import { createSelector } from 'reselect';

const detailRoom = state => state.room.detailRoom;

export const roomSelector = createSelector(
  [detailRoom],
  (detailRoom) => {
    const { data: { room }, loading, error } = detailRoom;
    return ({
      detail: room,
      loading,
      error,
    });
  }
);