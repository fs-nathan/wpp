import { call, put } from 'redux-saga/effects';
import { memberProjectGroupSuccess, memberProjectGroupFail } from '../../actions/projectGroup/memberProjectGroup';
import { apiService } from '../../constants/axiosInstance';

async function doMemberProjectGroup({ projectGroupId }) {
  try {
    const config = {
      url: '/project-group/members',
      method: 'get',
      params: {
        project_group_id: projectGroupId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* memberProjectGroup(action) {
  try {
    const { members } = yield call(doMemberProjectGroup, action.options);
    yield put(memberProjectGroupSuccess({ members }));
  } catch (error) {
    yield put(memberProjectGroupFail(error));
  }
}

export {
  memberProjectGroup,
}
