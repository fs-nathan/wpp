import { call, put } from 'redux-saga/effects';
import { deleteTaskSuccess, deleteTaskFail } from '../../actions/task/deleteTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_TASK } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    yield put(deleteTaskSuccess());
    CustomEventEmitter(DELETE_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  deleteTask,
}
