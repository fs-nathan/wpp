import { call, put } from 'redux-saga/effects';
import { listLevelSuccess, listLevelFail } from '../../actions/level/listLevel';
import { apiService } from '../../constants/axiosInstance';

async function doListLevel() {
  try {
    const config = {
      url: '/list-level',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listLevel() {
  try {
    const { levels } = yield call(doListLevel);
    yield put(listLevelSuccess({ levels }));
  } catch (error) {
    yield put(listLevelFail(error));
  }
}

export {
  listLevel,
}
