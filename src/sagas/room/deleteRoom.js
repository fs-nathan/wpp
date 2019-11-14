import { call, put } from 'redux-saga/effects';
import { deleteRoomSuccess, deleteRoomFail } from '../../actions/room/deleteRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_ROOM } from '../../constants/events';

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
    yield put(deleteRoomSuccess());
    CustomEventEmitter(DELETE_ROOM);
  } catch (error) {
    yield put(deleteRoomFail(error));
  }
}

export {
  deleteRoom,
}