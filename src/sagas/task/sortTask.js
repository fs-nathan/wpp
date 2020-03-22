import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { sortTaskFail, sortTaskSuccess } from '../../actions/task/sortTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_TASK } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doSortTask({ taskId, projectId, groupTask, sortIndex, }) {
  try {
    const config = {
      url: '/task/sort',
      method: 'post',
      data: {
        task_id: taskId,
        project_id: projectId,
        group_task: groupTask,
        sort_index: sortIndex,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* sortTask(action) {
  try {
    yield call(doSortTask, action.options);
    yield put(sortTaskSuccess(action.options));
    CustomEventEmitter(SORT_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortTaskFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { sortTask, };
