import { call, put } from 'redux-saga/effects';
import { updateRoomSuccess, updateRoomFail } from '../../actions/room/updateRoom';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_ROOM } from '../../constants/events';

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
    yield put(updateRoomSuccess({ room }));
    CustomEventEmitter(UPDATE_ROOM);
  } catch (error) {
    yield put(updateRoomFail(error));
  }
}

export {
  updateRoom,
}
