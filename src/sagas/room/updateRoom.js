import { call, put } from 'redux-saga/effects';
import { updateRoomSuccess, updateRoomFail } from '../../actions/room/updateRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_ROOM } from '../../constants/events';

async function doUpdateRoom({ roomId, name, icon, description }) {
  try {
    const config = {
      url: '/update-room',
      method: 'put',
      data: {
        room_id: roomId,
        name,
        icon,
        description,
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
    yield call(doUpdateRoom, action.options);
    yield put(updateRoomSuccess());
    CustomEventEmitter(UPDATE_ROOM);
  } catch (error) {
    yield put(updateRoomFail(error));
  }
}

export {
  updateRoom,
}
