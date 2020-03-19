import { call, put } from 'redux-saga/effects';
import { createTaskSuccess, createTaskFail } from '../../actions/task/createTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_TASK } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCreateTask({ name, projectId, groupTask, typeAssign, priority, description, startDate, startTime, endDate, endTime, }) {
  try {
    const config = {
      url: '/task/create',
      method: 'post',
      params: {
        gird: 'table',
      },
      data: {
        name,
        project_id: projectId,
        group_task: groupTask,
        type_assign: typeAssign,
        priority: priority,
        description,
        start_date: startDate,
        start_time: startTime,
        end_date: endDate,
        end_time: endTime,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createTask(action) {
  try {
    const { task } = yield call(doCreateTask, action.options);
    yield put(createTaskSuccess({ task }, action.options));
    CustomEventEmitter(CREATE_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createTaskFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createTask,
}
