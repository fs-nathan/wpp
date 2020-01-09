import { call, put } from 'redux-saga/effects';
import { sortRoomSuccess, sortRoomFail } from '../../actions/room/sortRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_ROOM } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortRoomFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  sortRoom,
}
