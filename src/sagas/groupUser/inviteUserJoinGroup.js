import { call, put } from 'redux-saga/effects';
import { inviteUserJoinGroupSuccess, inviteUserJoinGroupFail } from '../../actions/groupUser/inviteUserJoinGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, INVITE_USER_JOIN_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doInviteUserJoinGroup({ userId }) {
  try {
    const config = {
      url: '/invite-user-join-group',
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

function* inviteUserJoinGroup(action) {
  try {
    yield call(doInviteUserJoinGroup, action.options);
    yield put(inviteUserJoinGroupSuccess(action.options));
    CustomEventEmitter(INVITE_USER_JOIN_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(inviteUserJoinGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  inviteUserJoinGroup,
}
