import { call, put } from 'redux-saga/effects';
import { getListInvitationSentSuccess, getListInvitationSentFail } from '../../actions/groupUser/getListInvitationSent';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doGetListInvitationSent() {
  try {
    const config = {
      url: '/get-invitation-group-sent',
      method: 'get',
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* getListInvitationSent(action) {
  try {
    const { invitations } = yield call(doGetListInvitationSent, action.options);
    yield put(getListInvitationSentSuccess({ invitations }, action.options));
  } catch (error) {
    yield put(getListInvitationSentFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.QUERY.ERROR));
  }
}

export {
  getListInvitationSent,
}
