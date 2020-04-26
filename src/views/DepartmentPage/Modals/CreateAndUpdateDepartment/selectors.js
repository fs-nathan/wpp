import { createSelector } from 'reselect';

const createRoom = state => state.room.createRoom;
const updateRoom = state => state.room.updateRoom;

export const actionLoadingSelector = createSelector(
  [createRoom, updateRoom],
  (createRoom, updateRoom) => {
    const { loading: createLoading } = createRoom;
    const { loading: updateLoading } = updateRoom;
    return createLoading || updateLoading;
  }
);