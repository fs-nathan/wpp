import { createSelector } from 'reselect';

const listRoom = state => state.room.listRoom;
const listLevel= state => state.level.listLevel;
const listMajor= state => state.major.listMajor;
const listPosition= state => state.position.listPosition;

export const optionsSelector = createSelector(
  [listRoom, listLevel, listMajor, listPosition],
  (listRoom, listLevel, listMajor, listPosition) => {
    const { data: { rooms }, error: listRoomError, loading: listRoomLoading } = listRoom;
    const { data: { positions }, error: listPositionError, loading: listPositionLoading } = listPosition;
    const { data: { majors }, error: listMajorError, loading: listMajorLoading } = listMajor;
    const { data: { levels }, error: listLevelError, loading: listLevelLoading } = listLevel;

    return {
      rooms,
      positions,
      majors,
      levels,
      loading: listRoomLoading || listPositionLoading || listMajorLoading || listLevelLoading,
      error: listRoomError || listPositionError || listMajorError || listLevelError,
    }
  }
);