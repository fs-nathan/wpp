import { call, put } from 'redux-saga/effects';
import { updateStatusDateSuccess, updateStatusDateFail } from '../../../actions/project/setting/updateStatusDate';
import { apiService } from '../../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_STATUS_DATE } from '../../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../../constants/snackbarController';
import { get } from 'lodash';

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
    CustomEventEmitter(UPDATE_STATUS_DATE);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateStatusDateFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  updateStatusDate,
}
