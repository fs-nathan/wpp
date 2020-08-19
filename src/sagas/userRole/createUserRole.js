import { call, put } from 'redux-saga/effects';
import { createUserRoleSuccess, createUserRoleFail } from '../../actions/userRole/createUserRole';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_USER_ROLE } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCreatePosition({ name, description }) {
  try {
    const config = {
      url: '/create-user-role',
      method: 'post',
      data: {
        name,
        description,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* createUserRole(action) {
  try {
    const { user_role: userRole } = yield call(doCreatePosition, action.options);
    yield put(createUserRoleSuccess({ userRole }, action.options));
    CustomEventEmitter(CREATE_USER_ROLE);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(createUserRoleFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  createUserRole,
}
