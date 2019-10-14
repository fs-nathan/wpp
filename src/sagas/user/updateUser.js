import { call, put } from 'redux-saga/effects';
import { updateUserSuccess, updateUserFail } from '../../actions/user/updateUser';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, UPDATE_USER } from '../../constants/events';

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
  } catch (error) {
    yield put(updateUserFail(error));
  }
}

export {
  updateUser,
}
