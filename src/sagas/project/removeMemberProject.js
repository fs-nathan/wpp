import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { removeMemberProjectFail, removeMemberProjectSuccess } from '../../actions/project/removeMemberFromProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, REMOVE_MEMBER_PROJECT } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    yield put(removeMemberProjectSuccess(action.options));
    CustomEventEmitter(REMOVE_MEMBER_PROJECT.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(removeMemberProjectFail(error, action.options));
    CustomEventEmitter(REMOVE_MEMBER_PROJECT.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { removeMemberProject, };

