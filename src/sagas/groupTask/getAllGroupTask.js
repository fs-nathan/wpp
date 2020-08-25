import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { getAllGroupTaskFail, getAllGroupTaskSuccess } from '../../actions/groupTask/getAllGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, GET_ALL_GROUP_TASK } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doGetAllGroupTask() {
  try {
    const config = {
      url: '/group-task/get-all',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getAllGroupTask(action) {
  try {
    const { groups: groupTasks } = yield call(doGetAllGroupTask, action.options);
    yield put(getAllGroupTaskSuccess({ groupTasks }, action.options));
    CustomEventEmitter(GET_ALL_GROUP_TASK.SUCCESS);
  } catch (error) {
    yield put(getAllGroupTaskFail(error, action.options));
    CustomEventEmitter(GET_ALL_GROUP_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { getAllGroupTask, };

