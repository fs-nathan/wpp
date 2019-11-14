import { call, put } from 'redux-saga/effects';
import { listPositionSuccess, listPositionFail } from '../../actions/position/listPosition';
import { apiService } from '../../constants/axiosInstance';

async function doListPosition() {
  try {
    const config = {
      url: '/list-position',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listPosition() {
  try {
    const { position: positions } = yield call(doListPosition);
    yield put(listPositionSuccess({ positions }));
  } catch (error) {
    yield put(listPositionFail(error));
  }
}

export {
  listPosition,
}