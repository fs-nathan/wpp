import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listTaskFail, listTaskSuccess } from 'actions/kanban/listTask';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, KANBAN } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';

async function doListTask({ projectId }) {
  try {
    const config = {
      url: '/kanban/list-task',
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
    yield put(listTaskSuccess({ tasks }, action.options));
    CustomEventEmitter(KANBAN.LIST_TASK.SUCCESS);
  } catch (error) {
    yield put(listTaskFail(error, action.options));
    CustomEventEmitter(KANBAN.LIST_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listTask, };

