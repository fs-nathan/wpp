import { call, put } from 'redux-saga/effects';
import { createGroupTaskSuccess, createGroupTaskFail } from '../../actions/groupTask/createGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_GROUP_TASK } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    yield put(createGroupTaskSuccess({ groupTask }));
    CustomEventEmitter(CREATE_GROUP_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createGroupTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createGroupTask,
}
