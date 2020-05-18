import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { assignMemberToAllTaskFail, assignMemberToAllTaskSuccess } from '../../actions/project/assignMemberToAllTask';
import { apiService } from '../../constants/axiosInstance';
import { ASSIGN_MEMBER_TO_ALL_TASK, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doAssignMemberToAllTask({ projectId, memberId }) {
  try {
    const config = {
      url: 'project/assign-member-to-all-task',
      method: 'post',
      data: {
        project_id: projectId,
        member_id: memberId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* assignMemberToAllTask(action) {
  try {
    yield call(doAssignMemberToAllTask, action.options);
    yield put(assignMemberToAllTaskSuccess(action.options));
    CustomEventEmitter(ASSIGN_MEMBER_TO_ALL_TASK.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(assignMemberToAllTaskFail(error, action.options));
    CustomEventEmitter(ASSIGN_MEMBER_TO_ALL_TASK.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { assignMemberToAllTask, };

