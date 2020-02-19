import { call, put } from 'redux-saga/effects';
import { getUserOfRoomSuccess, getUserOfRoomFail } from '../../actions/room/getUserOfRoom';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doGetUserOfRoom({ roomId }) {
  try {
    const config = {
      url: '/get-user-of-room',
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

function* getUserOfRoom(action) {
  try {
    const { users } = yield call(doGetUserOfRoom, action.options);
    yield put(getUserOfRoomSuccess({ users }, action.options));
  } catch (error) {
    yield put(getUserOfRoomFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  getUserOfRoom,
}
