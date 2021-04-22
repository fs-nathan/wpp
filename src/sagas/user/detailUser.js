import { openDetailMember } from 'actions/chat/chat';
import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { detailUserFail, detailUserSuccess } from '../../actions/user/detailUser';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, DETAIL_USER } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    yield put(detailUserSuccess({ user }, action.options));
    yield put(openDetailMember(true))
    CustomEventEmitter(DETAIL_USER.SUCCESS);
  } catch (error) {
    yield put(detailUserFail(error));
    CustomEventEmitter(DETAIL_USER.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export { detailUser, };

