import { call, put } from 'redux-saga/effects';
import { addMemberProjectSuccess, addMemberProjectFail } from '../../actions/project/addMemberToProject';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, ADD_MEMBER_PROJECT } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doAddMemberProject({ projectId, memberId, groupPermission, roles }) {
  try {
    const config = {
      url: '/project/add-member',
      method: 'post',
      data: {
        project_id: projectId,
        member_id: memberId,
        group_permission: groupPermission,
        roles,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* addMemberProject(action) {
  try {
    yield call(doAddMemberProject, action.options);
    yield put(addMemberProjectSuccess());
    CustomEventEmitter(ADD_MEMBER_PROJECT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(addMemberProjectFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  addMemberProject,
}
