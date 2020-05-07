import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateRoomFail, updateRoomSuccess } from '../../actions/room/updateRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_ROOM } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doUpdateRoom({ roomId, name, icon, description, members }) {
  try {
    const config = {
      url: '/update-room',
      method: 'put',
      data: {
        room_id: roomId,
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

function* updateRoom(action) {
  try {
    const { room } = yield call(doUpdateRoom, action.options);
    yield put(updateRoomSuccess({ room }, action.options));
    CustomEventEmitter(UPDATE_ROOM.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateRoomFail(error, action.options));
    CustomEventEmitter(UPDATE_ROOM.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateRoom, };

