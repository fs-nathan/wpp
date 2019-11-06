import { call, put } from 'redux-saga/effects';
import { updateUserRoleSuccess, updateUserRoleFail } from '../../actions/userRole/updateUserRole';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_USER_ROLE } from '../../constants/events';

async function doUpdatePosition({ userRoleId, name, description }) {
  try {
    const config = {
      url: '/update-user-role',
      method: 'put',
      data: {
        user_role_id: userRoleId,
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

function* updateUserRole(action) {
  try {
    const { user_role: userRole } = yield call(doUpdatePosition, action.options);
    yield put(updateUserRoleSuccess({ userRole }));
    CustomEventEmitter(UPDATE_USER_ROLE);
  } catch (error) {
    yield put(updateUserRoleFail(error));
  }
}

export {
  updateUserRole,
}
