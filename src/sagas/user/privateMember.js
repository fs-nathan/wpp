import { call, put } from 'redux-saga/effects';
import { privateMemberSuccess, privateMemberFail } from '../../actions/user/privateMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, PRIVATE_MEMBER } from '../../constants/events';

async function doPublicMember({ userId }) {
  try {
    const config = {
      url: '/private-member',
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

function* privateMember(action) {
  try {
    yield call(doPublicMember, action.options);
    yield put(privateMemberSuccess());
    CustomEventEmitter(PRIVATE_MEMBER);
  } catch (error) {
    yield put(privateMemberFail(error));
  }
}

export {
  privateMember,
}
