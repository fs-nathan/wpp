import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteTaskFail, deleteTaskSuccess } from '../../actions/task/deleteTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_TASK } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doDeleteTask({ taskId }) {
  try {
    const config = {
      url: '/task/delete',
      method: 'delete',
      data: {
        task_id: taskId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteTask(action) {
  try {
    yield call(doDeleteTask, action.options);
    yield put(deleteTaskSuccess(action.options));
    CustomEventEmitter(DELETE_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteTaskFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteTask, };
