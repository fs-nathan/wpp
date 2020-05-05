import { get } from 'lodash';
import { call, put } from 'redux-saga/effects';
import { inviteOtherPeopleCreateAccountFail, inviteOtherPeopleCreateAccountSuccess } from '../../actions/register/inviteOtherPeopleCreateAccount';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, INVITE_OTHER_PEOPLE_CREATE_ACCOUNT } from '../../constants/events';
import { DEFAULT_MESSAGE, SnackbarEmitter, SNACKBAR_VARIANT } from '../../constants/snackbarController';

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
    CustomEventEmitter(INVITE_OTHER_PEOPLE_CREATE_ACCOUNT);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(inviteOtherPeopleCreateAccountFail(error));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export { inviteOtherPeopleCreateAccount, };

