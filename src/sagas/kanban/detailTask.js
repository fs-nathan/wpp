import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { detailTaskFail, detailTaskSuccess } from 'actions/kanban/detailTask';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doDetailTask({ taskId }) {
  try {
    const config = {
      url: '/task/detail',
      method: 'get',
      params: {
        task_id: taskId,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* detailTask(action) {
  try {
    const { task } = yield call(doDetailTask, action.options);
    yield put(detailTaskSuccess({ task }, action.options));
    CustomEventEmitter(KANBAN.DETAIL_TASK.SUCCESS);
  } catch (error) {
    yield put(detailTaskFail(error, action.options));
    CustomEventEmitter(KANBAN.DETAIL_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { detailTask, };

