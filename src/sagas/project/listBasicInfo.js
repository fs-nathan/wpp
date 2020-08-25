import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listProjectBasicInfoFail, listProjectBasicInfoSuccess } from '../../actions/project/listBasicInfo';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doListProjectBasicInfo() {
  try {
    const config = {
      url: 'project/list-basic',
      method: 'get'
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listProjectBasicInfo(action) {
  try {
    const { projects } = yield call(doListProjectBasicInfo, action.options);
    yield put(listProjectBasicInfoSuccess({ projects }, action.options));
  } catch (error) {
    yield put(listProjectBasicInfoFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listProjectBasicInfo };
