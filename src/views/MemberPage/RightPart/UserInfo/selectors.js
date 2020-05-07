import { find, get } from 'lodash';
import { createSelector } from 'reselect';

const detailUser = state => state.user.detailUser;
const uploadDocumentsUser = state => state.user.uploadDocumentsUser;
const listRoom = state => state.room.listRoom;
const listLevel = state => state.level.listLevel;
const listMajor = state => state.major.listMajor;
const listPosition = state => state.position.listPosition;

export const userSelector = createSelector(
  [detailUser, listRoom, listLevel, listMajor, listPosition],
  (detailUser, listRoom, listLevel, listMajor, listPosition) => {
    const { data: { user }, error: detailUserError, loading: detailUserLoading, firstTime: detailFirst } = detailUser;
    const { data: { rooms }, error: listRoomError, loading: listRoomLoading, firstTime: roomFirst } = listRoom;
    const { data: { positions }, error: listPositionError, loading: listPositionLoading, firstTime: positionFirst } = listPosition;
    const { data: { majors }, error: listMajorError, loading: listMajorLoading, firstTime: majorFirst } = listMajor;
    const { data: { levels }, error: listLevelError, loading: listLevelLoading, firstTime: levelFirst } = listLevel;
    const newUser = {
      ...user,
      room_name: get(find(rooms, { id: get(user, 'room_id') }), 'name', get(user, 'room_name')),
      position_name: get(find(positions, { id: get(user, 'position_id') }), 'name', get(user, 'position_name')),
      major_name: get(find(majors, { id: get(user, 'major_id') }), 'name', get(user, 'major_name')),
      level_name: get(find(levels, { id: get(user, 'level_id') }), 'name', get(user, 'level_name')),
    }
    return {
      user: newUser,
      loading: (detailFirst ? false : detailUserLoading) ||
        (roomFirst ? false : listRoomLoading) ||
        (positionFirst ? false : listPositionLoading) ||
        (majorFirst ? false : listMajorLoading) ||
        (levelFirst ? false : listLevelLoading),
      error: detailUserError || listRoomError || listPositionError || listMajorError || listLevelError,
      firstTime: detailFirst && roomFirst && positionFirst && majorFirst && levelFirst,
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