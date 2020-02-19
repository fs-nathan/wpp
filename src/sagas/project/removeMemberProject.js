import { call, put } from 'redux-saga/effects';
import { removeMemberProjectSuccess, removeMemberProjectFail } from '../../actions/project/removeMemberFromProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, REMOVE_MEMBER_PROJECT } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    CustomEventEmitter(REMOVE_MEMBER_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(removeMemberProjectFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  removeMemberProject,
}
