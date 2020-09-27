import {get} from "lodash";
import { call, put } from 'redux-saga/effects';
import { getWorkTypeFail, getWorkTypeSuccess } from '../../actions/project/getWorkType';
import { apiService } from '../../constants/axiosInstance';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doGetWorkType({ projectId }) {
  try {
    const config = {
      url: '/project/get-work-type',
      method: 'get',
      params: {
        project_id: projectId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getWorkType(action) {
  try {
    const { work_type } = yield call(doGetWorkType, action.options);
    yield put(getWorkTypeSuccess({ work_type }, action.options));
  } catch (error) {
    yield put(getWorkTypeFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getWorkType, };

