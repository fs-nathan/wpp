import { call, put } from 'redux-saga/effects';
import { updateGroupPermissionMemberSuccess, updateGroupPermissionMemberFail } from '../../actions/project/updateGroupPermissionMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_GROUP_PERMISSION_MEMBER } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doRemoveProjectRoleFromMember({ projectId, memberId, groupPermission, }) {
  try {
    const config = {
      url: '/project/update-group-permission-member',
      method: 'post',
      data: {
        project_id: projectId,
        member_id: memberId,
        group_permission: groupPermission,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateGroupPermissionMember(action) {
  try {
    yield call(doRemoveProjectRoleFromMember, action.options);
    yield put(updateGroupPermissionMemberSuccess());
    CustomEventEmitter(UPDATE_GROUP_PERMISSION_MEMBER);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateGroupPermissionMemberFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  updateGroupPermissionMember,
}
