import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { addProjectRoleToMemberFail, addProjectRoleToMemberSuccess } from '../../actions/project/addProjectRoleToMember';
import { apiService } from '../../constants/axiosInstance';
import { ADD_PROJECT_ROLE_TO_MEMBER, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doAddProjectRoleToMember({ projectId, memberId, roleId, }) {
  try {
    const config = {
      url: '/project/add-project-role-to-member',
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

function* addProjectRoleToMember(action) {
  try {
    yield call(doAddProjectRoleToMember, action.options);
    yield put(addProjectRoleToMemberSuccess(action.options));
    CustomEventEmitter(ADD_PROJECT_ROLE_TO_MEMBER.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(addProjectRoleToMemberFail(error, action.options));
    CustomEventEmitter(ADD_PROJECT_ROLE_TO_MEMBER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { addProjectRoleToMember, };

