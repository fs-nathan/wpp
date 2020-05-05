import { createSelector } from 'reselect';

const listRoom = state => state.room.listRoom;
const listLevel = state => state.level.listLevel;
const listMajor = state => state.major.listMajor;
const listPosition = state => state.position.listPosition;
const updateUser = state => state.user.updateUser;

export const optionsSelector = createSelector(
  [listRoom, listLevel, listMajor, listPosition],
  (listRoom, listLevel, listMajor, listPosition) => {
    const { data: { rooms }, error: listRoomError, loading: listRoomLoading, firstTime: roomFirst } = listRoom;
    const { data: { positions }, error: listPositionError, loading: listPositionLoading, firstTime: positionFirst } = listPosition;
    const { data: { majors }, error: listMajorError, loading: listMajorLoading, firstTime: majorFirst } = listMajor;
    const { data: { levels }, error: listLevelError, loading: listLevelLoading, firstTime: levelFirst } = listLevel;

    return {
      rooms,
      positions,
      majors,
      levels,
      loading: (roomFirst ? false : listRoomLoading) ||
        (positionFirst ? false : listPositionLoading) ||
        (majorFirst ? false : listMajorLoading) ||
        (levelFirst ? false : listLevelLoading),
      error: listRoomError || listPositionError || listMajorError || listLevelError,
      firstTime: roomFirst && positionFirst && majorFirst && levelFirst,
    }
  }
);

export const activeLoadingSelector = createSelector(
  [updateUser],
  (updateUser) => {
    const { loading } = updateUser;
    return loading;
  }
);