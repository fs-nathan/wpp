import { call, put } from 'redux-saga/effects';
import { sortTaskSuccess, sortTaskFail } from '../../actions/task/sortTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_TASK } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    yield put(sortTaskSuccess());
    CustomEventEmitter(SORT_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  sortTask,
}
