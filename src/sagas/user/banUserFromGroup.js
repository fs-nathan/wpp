import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { banUserFromGroupFail, banUserFromGroupSuccess } from '../../actions/user/banUserFromGroup';
import { apiService } from '../../constants/axiosInstance';
import { BAN_USER_FROM_GROUP, CustomEventEmitter } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

async function doBanUserFromGroup({ userId }) {
  try {
    const config = {
      url: '/ban-user-out-group',
      method: 'post',
      data: {
        user_id: userId,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* banUserFromGroup(action) {
  try {
    yield call(doBanUserFromGroup, action.options);
    yield put(banUserFromGroupSuccess(action.options));
    CustomEventEmitter(BAN_USER_FROM_GROUP.SUCCESS);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(banUserFromGroupFail(error, action.options));
    CustomEventEmitter(BAN_USER_FROM_GROUP.FAIL);
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { banUserFromGroup, };

