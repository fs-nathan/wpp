import { call, put } from 'redux-saga/effects';
import { updateStatusCopySuccess, updateStatusCopyFail } from '../../../actions/project/setting/updateStatusCopy';
import { apiService } from '../../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_STATUS_COPY } from '../../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../../constants/snackbarController';
import { get } from 'lodash';

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
    CustomEventEmitter(UPDATE_STATUS_COPY);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateStatusCopyFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  updateStatusCopy,
}
