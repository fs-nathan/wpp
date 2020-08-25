import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createRoomFail, createRoomSuccess } from '../../actions/room/createRoom';
import { apiService } from '../../constants/axiosInstance';
import { CREATE_ROOM, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doCreateRoom({ name, icon, description, members }) {
  try {
    const config = {
      url: '/create-room',
      method: 'post',
      data: {
        name,
        icon,
        description,
        members,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createRoom(action) {
  try {
    const { room } = yield call(doCreateRoom, action.options);
    yield put(createRoomSuccess({ room }, action.options));
    CustomEventEmitter(CREATE_ROOM.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createRoomFail(error, action.options));
    CustomEventEmitter(CREATE_ROOM.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { createRoom, };

