import { call, put } from 'redux-saga/effects';
import { banUserFromGroupSuccess, banUserFromGroupFail } from '../../actions/user/banUserFromGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, BAN_USER_FROM_GROUP } from '../../constants/events';

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
  } catch (error) {
    yield put(banUserFromGroupFail(error));
  }
}

export {
  banUserFromGroup,
}
