import { call, put } from 'redux-saga/effects';
import { memberProjectSuccess, memberProjectFail } from '../../actions/project/memberProject';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doMemberProject({ projectId }) {
  try {
    const config = {
      url: '/project/members',
      method: 'get',
      params: {
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
    const { member_added: membersAdded, member_frees: membersFree } = yield call(doMemberProject, action.options);
    yield put(memberProjectSuccess({ membersAdded, membersFree }, action.options));
  } catch (error) {
    yield put(memberProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  memberProject,
}
