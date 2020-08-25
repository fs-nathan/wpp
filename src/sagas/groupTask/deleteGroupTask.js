import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { deleteGroupTaskFail, deleteGroupTaskSuccess } from '../../actions/groupTask/deleteGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_GROUP_TASK } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doDeleteGroupTask({ groupTaskId }) {
  try {
    const config = {
      url: '/group-task/delete',
      method: 'delete',
      data: {
        group_task_id: groupTaskId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteGroupTask(action) {
  try {
    yield call(doDeleteGroupTask, action.options);
    yield put(deleteGroupTaskSuccess(action.options));
    CustomEventEmitter(DELETE_GROUP_TASK.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteGroupTaskFail(error, action.options));
    CustomEventEmitter(DELETE_GROUP_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { deleteGroupTask, };

