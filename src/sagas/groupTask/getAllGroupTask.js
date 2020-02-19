import { call, put } from 'redux-saga/effects';
import { getAllGroupTaskSuccess, getAllGroupTaskFail } from '../../actions/groupTask/getAllGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
  } catch (error) {
    yield put(getAllGroupTaskFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  getAllGroupTask,
}
