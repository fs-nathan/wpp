import { call, put } from 'redux-saga/effects';
import { sortGroupTaskSuccess, sortGroupTaskFail } from '../../actions/groupTask/sortGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_GROUP_TASK } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doSortGroupTask({ groupTaskId, sortIndex }) {
  try {
    const config = {
      url: '/group-task/sort',
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
    yield put(sortGroupTaskSuccess());
    CustomEventEmitter(SORT_GROUP_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortGroupTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  sortGroupTask,
}
