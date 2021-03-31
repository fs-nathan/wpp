import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getStatusWorkGroupFail, getStatusWorkGroupSuccess } from '../../actions/project/getStatusWork';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doGetStatusWorkGroup() {
  try {
    const config = {
      url: '/get-status-work-group',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getStatusWorkGroup(action) {
  try {
    const {data, complete_rate} = yield call(doGetStatusWorkGroup);
    yield put(getStatusWorkGroupSuccess({data: {status: data, complete_rate}}));
  } catch (error) {
    yield put(getStatusWorkGroupFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getStatusWorkGroup };

