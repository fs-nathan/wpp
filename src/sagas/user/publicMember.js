import { call, put } from 'redux-saga/effects';
import { publicMemberSuccess, publicMemberFail } from '../../actions/user/publicMember';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, PUBLIC_MEMBER } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

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
    yield put(publicMemberSuccess(action.options));
    CustomEventEmitter(PUBLIC_MEMBER);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(publicMemberFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  publicMember,
}
