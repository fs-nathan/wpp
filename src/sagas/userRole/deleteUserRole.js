import { call, put } from 'redux-saga/effects';
import { deleteUserRoleSuccess, deleteUserRoleFail } from '../../actions/userRole/deleteUserRole';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DELETE_USER_ROLE } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doDeletePosition({ userRoleId }) {
  try {
    const config = {
      url: '/delete-user-role',
      method: 'delete',
      data: {
        user_role_id: userRoleId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* deleteUserRole(action) {
  try {
    yield call(doDeletePosition, action.options);
    yield put(deleteUserRoleSuccess());
    CustomEventEmitter(DELETE_USER_ROLE);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(deleteUserRoleFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  deleteUserRole,
}
