import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listRoomFail, listRoomSuccess } from '../../actions/room/listRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, LIST_ROOM } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doListRoom() {
  try {
    const config = {
      url: '/list-room',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listRoom(action) {
  try {
    const { rooms } = yield call(doListRoom);
    yield put(listRoomSuccess({ rooms }, action.options));
    CustomEventEmitter(LIST_ROOM.SUCCESS);
  } catch (error) {
    yield put(listRoomFail(error, action.options));
    CustomEventEmitter(LIST_ROOM.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listRoom, };

