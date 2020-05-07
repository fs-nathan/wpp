import { updateStatusViewFail, updateStatusViewSuccess } from 'actions/project/setting/updateStatusView';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, UPDATE_STATUS_VIEW } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';

async function doUpdateStatusView({ projectId, status }) {
  try {
    const config = {
      url: 'project/setting/update-task-view',
      method: 'post',
      data: {
        project_id: projectId,
        task_view: status,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateStatusView(action) {
  try {
    yield call(doUpdateStatusView, action.options);
    yield put(updateStatusViewSuccess(action.options));
    CustomEventEmitter(UPDATE_STATUS_VIEW.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateStatusViewFail(error, action.options));
    CustomEventEmitter(UPDATE_STATUS_VIEW.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateStatusView, };

