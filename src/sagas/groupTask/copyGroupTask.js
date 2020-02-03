import { call, put } from 'redux-saga/effects';
import { copyGroupTaskSuccess, copyGroupTaskFail } from '../../actions/groupTask/copyGroupTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, COPY_GROUP_TASK } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCopyGroupTask({ groupTaskId, projectId }) {
  try {
    const config = {
      url: '/group-task/copy',
      method: 'post',
      data: {
        group_task_id: groupTaskId,
        project_id: projectId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* copyGroupTask(action) {
  try {
    yield call(doCopyGroupTask, action.options);
    yield put(copyGroupTaskSuccess());
    CustomEventEmitter(COPY_GROUP_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(copyGroupTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  copyGroupTask,
}
