import { call, put } from 'redux-saga/effects';
import { listUserRoleSuccess, listUserRoleFail } from '../../actions/userRole/listUserRole';
import { apiService } from '../../constants/axiosInstance';

async function doListPosition() {
  try {
    const config = {
      url: '/list-user-role',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* listUserRole() {
  try {
    const { user_roles: userRoles } = yield call(doListPosition);
    yield put(listUserRoleSuccess({ userRoles }));
  } catch (error) {
    yield put(listUserRoleFail(error));
  }
}

export {
  listUserRole,
}
