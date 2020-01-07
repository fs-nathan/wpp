import { call, put } from 'redux-saga/effects';
import { updateStateJoinTaskSuccess, updateStateJoinTaskFail } from '../../actions/project/updateStateJoinTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_STATE_JOIN_TASK } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    yield put(updateStateJoinTaskSuccess());
    CustomEventEmitter(UPDATE_STATE_JOIN_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateStateJoinTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  updateStateJoinTask,
}
