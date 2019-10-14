import { call, put } from 'redux-saga/effects';
import { publicMemberSuccess, publicMemberFail } from '../../actions/user/publicMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, PUBLIC_MEMBER } from '../../constants/events';

async function doPublicMember({ userId }) {
  try {
    const config = {
      url: '/public-member',
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

function* publicMember(action) {
  try {
    yield call(doPublicMember, action.options);
    yield put(publicMemberSuccess());
    CustomEventEmitter(PUBLIC_MEMBER);
  } catch (error) {
    yield put(publicMemberFail(error));
  }
}

export {
  publicMember,
}
