import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { memberProjectFail, memberProjectSuccess } from '../../actions/project/memberProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, MEMBER_PROJECT } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    const { member_added: membersAdded, member_frees: membersFree, total_task: totalTask } = yield call(doMemberProject, action.options);
    yield put(memberProjectSuccess({ membersAdded, membersFree, totalTask }, action.options));
    CustomEventEmitter(MEMBER_PROJECT.SUCCESS);
  } catch (error) {
    yield put(memberProjectFail(error, action.options));
    CustomEventEmitter(MEMBER_PROJECT.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { memberProject, };

