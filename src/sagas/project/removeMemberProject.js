import { call, put } from 'redux-saga/effects';
import { removeMemberProjectSuccess, removeMemberProjectFail } from '../../actions/project/removeMemberFromProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, REMOVE_MEMBER_PROJECT } from '../../constants/events';

async function doRemoveMemberProject({ projectId, memberId }) {
  try {
    const config = {
      url: '/project/delete-member',
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

function* removeMemberProject(action) {
  try {
    yield call(doRemoveMemberProject, action.options);
    yield put(removeMemberProjectSuccess());
    CustomEventEmitter(REMOVE_MEMBER_PROJECT);
  } catch (error) {
    yield put(removeMemberProjectFail(error));
  }
}

export {
  removeMemberProject,
}
