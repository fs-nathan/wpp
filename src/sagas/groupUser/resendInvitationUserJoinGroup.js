import { call, put } from 'redux-saga/effects';
import { resendInvitationUserJoinGroupSuccess, resendInvitationUserJoinGroupFail } from '../../actions/groupUser/resendInvitationUserJoinGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, RESEND_INVITATION_USER_JOIN_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doResendInvitationUserJoinGroup({ userId }) {
  try {
    const config = {
      url: '/resend-invitation-user-join-group',
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

function* resendInvitationUserJoinGroup(action) {
  try {
    yield call(doResendInvitationUserJoinGroup, action.options);
    yield put(resendInvitationUserJoinGroupSuccess(action.options));
    CustomEventEmitter(RESEND_INVITATION_USER_JOIN_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(resendInvitationUserJoinGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  resendInvitationUserJoinGroup,
}
