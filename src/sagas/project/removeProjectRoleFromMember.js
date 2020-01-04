import { call, put } from 'redux-saga/effects';
import { removeProjectRoleFromMemberSuccess, removeProjectRoleFromMemberFail } from '../../actions/project/removeProjectRoleFromMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, REMOVE_PROJECT_ROLE_FROM_MEMBER } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doRemoveProjectRoleFromMember({ projectId, memberId, roleId, }) {
  try {
    const config = {
      url: '/project/remove-project-role-from-member',
      method: 'post',
      data: {
        project_id: projectId,
        member_id: memberId,
        role_id: roleId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* removeProjectRoleFromMember(action) {
  try {
    yield call(doRemoveProjectRoleFromMember, action.options);
    yield put(removeProjectRoleFromMemberSuccess());
    CustomEventEmitter(REMOVE_PROJECT_ROLE_FROM_MEMBER);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(removeProjectRoleFromMemberFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  removeProjectRoleFromMember,
}
