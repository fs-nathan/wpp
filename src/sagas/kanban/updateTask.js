import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateTaskFail, updateTaskSuccess } from 'actions/kanban/updateTask';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doUpdateTask({ taskId, name, description }) {
  try {
    const config = {
      url: '/task/update-name-description',
      method: 'put',
      data: {
        task_id: taskId,
        name,
        description,
      },
    };
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateTask(action) {
  try {
    const { task } = yield call(doUpdateTask, action.options);
    yield put(updateTaskSuccess({ task }, action.options));
    CustomEventEmitter(KANBAN.UPDATE_TASK.SUCCESS);
  } catch (error) {
    yield put(updateTaskFail(error, action.options));
    CustomEventEmitter(KANBAN.UPDATE_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { updateTask, };

