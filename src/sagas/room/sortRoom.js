import { call, put } from 'redux-saga/effects';
import { sortRoomSuccess, sortRoomFail } from '../../actions/room/sortRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_ROOM } from '../../constants/events';

async function doSortRoom({ roomId, sortIndex }) {
  try {
    const config = {
      url: '/sort-room',
      method: 'post',
      data: {
        room_id: roomId,
        sort_index: sortIndex,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* sortRoom(action) {
  try {
    yield call(doSortRoom, action.options);
    yield put(sortRoomSuccess());
    CustomEventEmitter(SORT_ROOM);
  } catch (error) {
    yield put(sortRoomFail(error));
  }
}

export {
  sortRoom,
}
