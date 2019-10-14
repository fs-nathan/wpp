import { call, put } from 'redux-saga/effects';
import { searchUserSuccess, searchUserFail } from '../../actions/user/searchUser';
import { apiService } from '../../constants/axiosInstance';

async function doSearchUser({ info }) {
  try {
    const config = {
      url: '/search-user',
      method: 'get',
      params: {
        info
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* searchUser(action) {
  try {
    const { data } = yield call(doSearchUser, action.options);
    yield put(searchUserSuccess({ data }));
  } catch (error) {
    yield put(searchUserFail(error));
  }
}

export {
  searchUser,
}
