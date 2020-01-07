import { call, put } from 'redux-saga/effects';
import { detailRoomSuccess, detailRoomFail } from '../../actions/room/detailRoom';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doDetailRoom({ roomId }) {
  try {
    const config = {
      url: '/detail-room',
      method: 'get',
      params: {
        room_id: roomId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* detailRoom(action) {
  try {
    const { room } = yield call(doDetailRoom, action.options);
    yield put(detailRoomSuccess({ room }));
  } catch (error) {
    yield put(detailRoomFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  detailRoom,
}
