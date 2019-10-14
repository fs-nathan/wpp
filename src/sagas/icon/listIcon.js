import { call, put } from 'redux-saga/effects';
import { listIconSuccess, listIconFail } from '../../actions/icon/listIcon';
import { apiService } from '../../constants/axiosInstance';

async function doListIcon() {
  try {
    const config = {
      url: '/list-icon',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listIcon() {
  try {
    const { icons } = yield call(doListIcon);
    yield put(listIconSuccess({ icons }));
  } catch (error) {
    yield put(listIconFail(error));
  }
}

export {
  listIcon,
}
