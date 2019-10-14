import { call, put } from 'redux-saga/effects';
import { listMajorSuccess, listMajorFail } from '../../actions/major/listMajor';
import { apiService } from '../../constants/axiosInstance';

async function doListMajor() {
  try {
    const config = {
      url: '/list-major',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listMajor() {
  try {
    const { majors } = yield call(doListMajor);
    yield put(listMajorSuccess({ majors }));
  } catch (error) {
    yield put(listMajorFail(error));
  }
}

export {
  listMajor,
}
