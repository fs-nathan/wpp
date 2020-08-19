import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { removeProjectRoleFromMemberFail, removeProjectRoleFromMemberSuccess } from '../../actions/project/removeProjectRoleFromMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, REMOVE_PROJECT_ROLE_FROM_MEMBER } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    yield put(removeProjectRoleFromMemberSuccess(action.options));
    CustomEventEmitter(REMOVE_PROJECT_ROLE_FROM_MEMBER.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(removeProjectRoleFromMemberFail(error, action.options));
    CustomEventEmitter(REMOVE_PROJECT_ROLE_FROM_MEMBER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { removeProjectRoleFromMember, };

