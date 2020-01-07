import { call, put } from 'redux-saga/effects';
import { createRoomSuccess, createRoomFail } from '../../actions/room/createRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_ROOM } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    yield put(createRoomSuccess({ room }));
    CustomEventEmitter(CREATE_ROOM);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createRoomFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createRoom,
}
