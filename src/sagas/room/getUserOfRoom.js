import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getUserOfRoomFail, getUserOfRoomSuccess } from '../../actions/room/getUserOfRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, GET_USER_OF_ROOM } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    CustomEventEmitter(GET_USER_OF_ROOM.SUCCESS);
  } catch (error) {
    yield put(getUserOfRoomFail(error, action.options));
    CustomEventEmitter(GET_USER_OF_ROOM.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getUserOfRoom, };

