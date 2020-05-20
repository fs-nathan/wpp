import { removeGroupPermissionUserFail, removeGroupPermissionUserSuccess } from 'actions/user/removeGroupPermissionUser';
import { apiService } from 'constants/axiosInstance';
import { CustomEventEmitter, REMOVE_GROUP_PERMISSION_USER } from 'constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from 'constants/snackbarController';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';

async function doRemoveGroupPermissionUser({ userId, }) {
  try {
    const config = {
      url: '/remove-group-permission-member',
      method: 'post',
      data: {
        member_id: userId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* removeGroupPermissionUser(action) {
  try {
    yield call(doRemoveGroupPermissionUser, action.options);
    yield put(removeGroupPermissionUserSuccess(action.options));
    CustomEventEmitter(REMOVE_GROUP_PERMISSION_USER.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(removeGroupPermissionUserFail(error, action.options));
    CustomEventEmitter(REMOVE_GROUP_PERMISSION_USER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { removeGroupPermissionUser, };

