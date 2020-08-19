import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { updateGroupPermissionMemberFail, updateGroupPermissionMemberSuccess } from '../../actions/project/updateGroupPermissionMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_GROUP_PERMISSION_MEMBER } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doUpdateGroupPermissionMember({ projectId, memberId, groupPermission, }) {
  try {
    const config = {
      url: '/project/update-group-permission-member',
      method: 'post',
      data: {
        project_id: projectId,
        member_id: memberId,
        group_permission_id: groupPermission,
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
    yield call(doUpdateGroupPermissionMember, action.options);
    yield put(updateGroupPermissionMemberSuccess(action.options));
    CustomEventEmitter(UPDATE_GROUP_PERMISSION_MEMBER.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateGroupPermissionMemberFail(error, action.options));
    CustomEventEmitter(UPDATE_GROUP_PERMISSION_MEMBER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateGroupPermissionMember, };

