import { call, put } from 'redux-saga/effects';
import { assignMemberToAllTaskSuccess, assignMemberToAllTaskFail } from '../../actions/project/assignMemberToAllTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, ASSIGN_MEMBER_TO_ALL_TASK } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    yield put(assignMemberToAllTaskSuccess());
    CustomEventEmitter(ASSIGN_MEMBER_TO_ALL_TASK);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(assignMemberToAllTaskFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));    
  }
}

export {
  assignMemberToAllTask,
}
