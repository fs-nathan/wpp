import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteRoomFail, deleteRoomSuccess } from '../../actions/room/deleteRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_ROOM } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doDeleteRoom({ roomId }) {
  try {
    const config = {
      url: '/delete-room',
      method: 'delete',
      data: {
        room_id: roomId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteRoom(action) {
  try {
    yield call(doDeleteRoom, action.options);
    yield put(deleteRoomSuccess(action.options));
    CustomEventEmitter(DELETE_ROOM.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteRoomFail(error, action.options));
    CustomEventEmitter(DELETE_ROOM.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteRoom, };

