import { call, put } from 'redux-saga/effects';
import { privateMemberSuccess, privateMemberFail } from '../../actions/user/privateMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, PRIVATE_MEMBER } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    yield put(privateMemberSuccess(action.options));
    CustomEventEmitter(PRIVATE_MEMBER);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(privateMemberFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  privateMember,
}
