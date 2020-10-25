import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getProjectStatisticFail, getProjectStatisticSuccess } from '../../actions/project/getStatistic';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doGetProjectStatistic() {
  try {
    const config = {
      url: '/project/statistic',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getProjectStatistic(action) {
  try {
    const { number_process, number_project, number_work_topic } = yield call(doGetProjectStatistic, action.options);
    yield put(getProjectStatisticSuccess({ number_process, number_project, number_work_topic }, action.options));
  } catch (error) {
    yield put(getProjectStatisticFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getProjectStatistic, };

