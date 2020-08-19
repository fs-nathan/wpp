import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateStatusCopyFail, updateStatusCopySuccess } from '../../../actions/project/setting/updateStatusCopy';
import { apiService } from '../../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_STATUS_COPY } from '../../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../../constants/snackbarController';

async function doUpdateStatusCopy({ projectId, status }) {
  try {
    const config = {
      url: 'project/setting/update-status-copy',
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

function* updateStatusCopy(action) {
  try {
    yield call(doUpdateStatusCopy, action.options);
    yield put(updateStatusCopySuccess(action.options));
    CustomEventEmitter(UPDATE_STATUS_COPY.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateStatusCopyFail(error, action.options));
    CustomEventEmitter(UPDATE_STATUS_COPY.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateStatusCopy, };

