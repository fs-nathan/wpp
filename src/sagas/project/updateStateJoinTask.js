import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateStateJoinTaskFail, updateStateJoinTaskSuccess } from '../../actions/project/updateStateJoinTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_STATE_JOIN_TASK } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doUpdateStateJoinTask({ projectId, memberId, state, }) {
  try {
    const config = {
      url: '/project/change-state-join-task',
      method: 'post',
      data: {
        project_id: projectId,
        member_id: memberId,
        state,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateStateJoinTask(action) {
  try {
    yield call(doUpdateStateJoinTask, action.options);
    yield put(updateStateJoinTaskSuccess(action.options));
    CustomEventEmitter(UPDATE_STATE_JOIN_TASK.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateStateJoinTaskFail(error, action.options));
    CustomEventEmitter(UPDATE_STATE_JOIN_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateStateJoinTask, };

