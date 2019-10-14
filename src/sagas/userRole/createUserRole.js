import { call, put } from 'redux-saga/effects';
import { createUserRoleSuccess, createUserRoleFail } from '../../actions/userRole/createUserRole';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CREATE_USER_ROLE } from '../../constants/events';

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
    const { user_role_id: userRoleId } = yield call(doCreatePosition, action.options);
    yield put(createUserRoleSuccess({ userRoleId }));
    CustomEventEmitter(CREATE_USER_ROLE);
  } catch (error) {
    yield put(createUserRoleFail(error));
  }
}

export {
  createUserRole,
}
