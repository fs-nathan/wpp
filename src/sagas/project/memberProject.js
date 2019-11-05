import { call, put } from 'redux-saga/effects';
import { memberProjectSuccess, memberProjectFail } from '../../actions/project/memberProject';
import { apiService } from '../../constants/axiosInstance';

async function doMemberProject({ projectId }) {
  try {
    const config = {
      url: '/project/members',
      method: 'get',
      data: {
        project_id: projectId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* memberProject(action) {
  try {
    const { member_added: members } = yield call(doMemberProject, action.options);
    yield put(memberProjectSuccess({ members }));
  } catch (error) {
    yield put(memberProjectFail(error));
  }
}

export {
  memberProject,
}
