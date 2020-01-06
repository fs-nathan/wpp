import { call, put } from 'redux-saga/effects';
import { listTaskSuccess, listTaskFail } from '../../actions/task/listTask';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doListTask({ projectId }) {
  try {
    const config = {
      url: '/task/list-task-table',
      method: 'get',
      params: {
        project_id: projectId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listTask(action) {
  try {
    const { tasks } = yield call(doListTask, action.options);
    yield put(listTaskSuccess({ tasks }));
  } catch (error) {
    yield put(listTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  listTask,
}
