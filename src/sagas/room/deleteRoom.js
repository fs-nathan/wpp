import { call, put } from 'redux-saga/effects';
import { deleteRoomSuccess, deleteRoomFail } from '../../actions/room/deleteRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_ROOM } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    CustomEventEmitter(DELETE_ROOM);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteRoomFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  deleteRoom,
}
