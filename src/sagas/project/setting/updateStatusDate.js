import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateStatusDateFail, updateStatusDateSuccess } from '../../../actions/project/setting/updateStatusDate';
import { apiService } from '../../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_STATUS_DATE } from '../../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdateStatusDate({ projectId, status }) {
  try {
    const config = {
      url: 'project/setting/update-status-date',
      method: 'post',
      data: {
        project_id: projectId,
        status,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateStatusDate(action) {
  try {
    yield call(doUpdateStatusDate, action.options);
    yield put(updateStatusDateSuccess(action.options));
    CustomEventEmitter(UPDATE_STATUS_DATE.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateStatusDateFail(error, action.options));
    CustomEventEmitter(UPDATE_STATUS_DATE.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateStatusDate, };

