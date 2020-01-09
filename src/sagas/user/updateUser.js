import { call, put } from 'redux-saga/effects';
import { updateUserSuccess, updateUserFail } from '../../actions/user/updateUser';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_USER } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doUpdateUser({ userId, roomId, positionId, levelId, majorId, description }) {
  try {
    const config = {
      url: '/update-user',
      method: 'put',
      data: {
        user_id: userId,
        room: roomId,
        position: positionId,
        level: levelId,
        major: majorId,
        description,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* updateUser(action) {
  try {
    yield call(doUpdateUser, action.options);
    yield put(updateUserSuccess());
    CustomEventEmitter(UPDATE_USER);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(updateUserFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  updateUser,
}
