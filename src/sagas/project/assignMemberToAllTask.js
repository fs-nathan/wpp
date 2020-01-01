import { call, put } from 'redux-saga/effects';
import { assignMemberToAllTaskSuccess, assignMemberToAllTaskFail } from '../../actions/project/assignMemberToAllTask';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, ASSIGN_MEMBER_TO_ALL_TASK } from '../../constants/events';

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
  } catch (error) {
    yield put(assignMemberToAllTaskFail(error));
  }
}

export {
  assignMemberToAllTask,
}
