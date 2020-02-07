import { call, put } from 'redux-saga/effects';
import { inviteOtherPeopleCreateAccountSuccess, inviteOtherPeopleCreateAccountFail } from '../../actions/register/inviteOtherPeopleCreateAccount';
import { apiService } from '../../constants/axiosInstance';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doInviteOtherPeopleCreateAccount({ email }) {
  try {
    const config = {
      url: '/invite-other-people-create-account',
      method: 'post',
      data: {
        email,
      },
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* inviteOtherPeopleCreateAccount(action) {
  try {
    yield call(doInviteOtherPeopleCreateAccount, action.options);
    yield put(inviteOtherPeopleCreateAccountSuccess());
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(inviteOtherPeopleCreateAccountFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  inviteOtherPeopleCreateAccount,
}
