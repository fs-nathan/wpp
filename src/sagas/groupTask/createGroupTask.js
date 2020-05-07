import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { createGroupTaskFail, createGroupTaskSuccess } from '../../actions/groupTask/createGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CREATE_GROUP_TASK, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doCreateGroupTask({ projectId, name, description }) {
  try {
    const config = {
      url: '/group-task/create',
      method: 'post',
      data: {
        project_id: projectId,
        name,
        description,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createGroupTask(action) {
  try {
    const { group_task: groupTask } = yield call(doCreateGroupTask, action.options);
    yield put(createGroupTaskSuccess({ groupTask }, action.options));
    CustomEventEmitter(CREATE_GROUP_TASK.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createGroupTaskFail(error, action.options));
    CustomEventEmitter(CREATE_GROUP_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { createGroupTask, };

