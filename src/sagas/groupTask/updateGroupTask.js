import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateGroupTaskFail, updateGroupTaskSuccess } from '../../actions/groupTask/updateGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_GROUP_TASK } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doUpdateGroupTask({ groupTaskId, name, description }) {
  try {
    const config = {
      url: '/group-task/update',
      method: 'put',
      data: {
        group_task_id: groupTaskId,
        name,
        description,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateGroupTask(action) {
  try {
    const { group_task: groupTask } = yield call(doUpdateGroupTask, action.options);
    yield put(updateGroupTaskSuccess({ groupTask }, action.options));
    CustomEventEmitter(UPDATE_GROUP_TASK.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateGroupTaskFail(error, action.options));
    CustomEventEmitter(UPDATE_GROUP_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateGroupTask, };

