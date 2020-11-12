import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { sortGroupTaskFail, sortGroupTaskSuccess } from 'actions/kanban/sortGroupTask';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doSortGroupTask({ groupTaskId, sortIndex, }) {
  try {
    const config = {
      url: 'group-task/sort',
      method: 'post',
      data: {
        group_task_id: groupTaskId, 
        sort_index: sortIndex,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* sortGroupTask(action) {
  try {
    yield call(doSortGroupTask, action.options);
    yield put(sortGroupTaskSuccess(action.options));
    CustomEventEmitter(KANBAN.SORT_GROUP_TASK.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortGroupTaskFail(error, action.options));
    CustomEventEmitter(KANBAN.SORT_GROUP_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { sortGroupTask, };

