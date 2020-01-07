import { call, put } from 'redux-saga/effects';
import { sortUserSuccess, sortUserFail } from '../../actions/user/sortUser';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, SORT_USER } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doSortUser({ userId, sortIndex, roomId }) {
  try {
    const config = {
      url: '/sort-user',
      method: 'post',
      data: {
        user_id: userId,
        room_id: roomId,
        sort_index: sortIndex,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* sortUser(action) {
  try {
    yield call(doSortUser, action.options);
    yield put(sortUserSuccess());
    CustomEventEmitter(SORT_USER);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(sortUserFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  sortUser,
}
