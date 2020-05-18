import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { listGroupTaskFail, listGroupTaskSuccess } from '../../actions/groupTask/listGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, LIST_GROUP_TASK } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doListGroupTask({ projectId }) {
  try {
    const config = {
      url: '/group-task/list',
      method: 'get',
      params: {
        project_id: projectId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listGroupTask(action) {
  try {
    const { group_tasks: groupTasks } = yield call(doListGroupTask, action.options);
    yield put(listGroupTaskSuccess({ groupTasks }, action.options));
    CustomEventEmitter(LIST_GROUP_TASK.SUCCESS);
  } catch (error) {
    yield put(listGroupTaskFail(error, action.options));
    CustomEventEmitter(LIST_GROUP_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { listGroupTask, };

