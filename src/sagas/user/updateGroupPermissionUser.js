import { updateGroupPermissionUserFail, updateGroupPermissionUserSuccess } from 'actions/user/updateGroupPermissionUser';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, UPDATE_GROUP_PERMISSION_USER } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';

async function doUpdateGroupPermissionUser({ userId, groupPermission, }) {
  try {
    const config = {
      url: '/update-group-permission-member',
      method: 'post',
      data: {
        member_id: userId,
        group_permission_id: groupPermission,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateGroupPermissionUser(action) {
  try {
    yield call(doUpdateGroupPermissionUser, action.options);
    yield put(updateGroupPermissionUserSuccess(action.options));
    CustomEventEmitter(UPDATE_GROUP_PERMISSION_USER.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateGroupPermissionUserFail(error, action.options));
    CustomEventEmitter(UPDATE_GROUP_PERMISSION_USER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { updateGroupPermissionUser, };

