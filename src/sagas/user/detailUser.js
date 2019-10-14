import { call, put } from 'redux-saga/effects';
import { detailUserSuccess, detailUserFail } from '../../actions/user/detailUser';
import { apiService } from '../../constants/axiosInstance';

async function doDetailUser({ userId }) {
  try {
    const config = {
      url: '/detail-user',
      method: 'get',
      params: {
        user_id: userId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* detailUser(action) {
  try {
    const { user } = yield call(doDetailUser, action.options);
    yield put(detailUserSuccess({ user }));
  } catch (error) {
    yield put(detailUserFail(error));
  }
}

export {
  detailUser,
}
