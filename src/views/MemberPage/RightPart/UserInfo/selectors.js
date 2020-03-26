import { find, get } from 'lodash';
import { createSelector } from 'reselect';

const detailUser = state => state.user.detailUser;
const updateUser = state => state.user.updateUser;
const uploadDocumentsUser = state => state.user.uploadDocumentsUser;
const listRoom = state => state.room.listRoom;
const listLevel = state => state.level.listLevel;
const listMajor = state => state.major.listMajor;
const listPosition = state => state.position.listPosition;

export const userSelector = createSelector(
  [detailUser, listRoom, listLevel, listMajor, listPosition, updateUser],
  (detailUser, listRoom, listLevel, listMajor, listPosition, updateUser) => {
    const { data: { user }, error: detailUserError, loading: detailUserLoading } = detailUser;
    const { data: { rooms }, error: listRoomError, loading: listRoomLoading } = listRoom;
    const { data: { positions }, error: listPositionError, loading: listPositionLoading } = listPosition;
    const { data: { majors }, error: listMajorError, loading: listMajorLoading } = listMajor;
    const { data: { levels }, error: listLevelError, loading: listLevelLoading } = listLevel;
    const { loading: updateLoading, error: updateError } = updateUser;
    const newUser = {
      ...user,
      room_name: get(find(rooms, { id: get(user, 'room_id') }), 'name', get(user, 'room_name')),
      position_name: get(find(positions, { id: get(user, 'position_id') }), 'name', get(user, 'position_name')),
      major_name: get(find(majors, { id: get(user, 'major_id') }), 'name', get(user, 'major_name')),
      level_name: get(find(levels, { id: get(user, 'level_id') }), 'name', get(user, 'level_name')),
    }
    return {
      user: newUser,
      loading: detailUserLoading || listRoomLoading || listPositionLoading || listMajorLoading || listLevelLoading || updateLoading,
      error: detailUserError || listRoomError || listPositionError || listMajorError || listLevelError || updateError,
    }
  }
);

export const isUploadSelector = createSelector(
  [uploadDocumentsUser],
  (uploadDocumentsUser) => {
    const { loading } = uploadDocumentsUser;
    return loading;
  }
);