import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { detailRoomFail, detailRoomSuccess } from '../../actions/room/detailRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DETAIL_ROOM } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    yield put(detailRoomSuccess({ room }, action.options));
    CustomEventEmitter(DETAIL_ROOM.SUCCESS);
  } catch (error) {
    yield put(detailRoomFail(error, action.options));
    CustomEventEmitter(DETAIL_ROOM.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { detailRoom, };

