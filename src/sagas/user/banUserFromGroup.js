import { call, put } from 'redux-saga/effects';
import { banUserFromGroupSuccess, banUserFromGroupFail } from '../../actions/user/banUserFromGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, BAN_USER_FROM_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doBanUserFromGroup({ userId }) {
  try {
    const config = {
      url: '/ban-user-from-group',
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
    yield put(banUserFromGroupSuccess());
    CustomEventEmitter(BAN_USER_FROM_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(banUserFromGroupFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  banUserFromGroup,
}
