import { call, put } from 'redux-saga/effects';
import { listRoomSuccess, listRoomFail } from '../../actions/room/listRoom';
import { apiService } from '../../constants/axiosInstance';

async function doListRoom() {
  try {
    const config = {
      url: '/list-room',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listRoom() {
  try {
    const { rooms } = yield call(doListRoom);
    yield put(listRoomSuccess({ rooms }));
  } catch (error) {
    yield put(listRoomFail(error));
  }
}

export {
  listRoom,
}
