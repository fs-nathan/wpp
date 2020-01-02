import { call, put } from 'redux-saga/effects';
import { listRoomSuccess, listRoomFail } from '../../actions/room/listRoom';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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

function* listRoom() {
  try {
    const { rooms } = yield call(doListRoom);
    yield put(listRoomSuccess({ rooms }));
  } catch (error) {
    yield put(listRoomFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listRoom,
}
