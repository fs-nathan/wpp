import { call, put } from 'redux-saga/effects';
import { cancleInvitationJoinGroupSuccess, cancleInvitationJoinGroupFail } from '../../actions/groupUser/cancleInvitationJoinGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, CANCLE_INVITATION_JOIN_GROUP } from '../../constants/events';
import { SnackbarEmitter, SNACKBAR_VARIANT, DEFAULT_MESSAGE } from '../../constants/snackbarController';
import { get } from 'lodash';

async function doCancleInvitationJoinGroup({ invitationId }) {
  try {
    const config = {
      url: '/cancel-invitation-join-group',
      method: 'post',
      data: {
        invitation_id: invitationId,
      }
    }
    const result = await apiService(config);
    return result.data;
  } catch (error) {
    throw error;
  }
}

function* cancleInvitationJoinGroup(action) {
  try {
    yield call(doCancleInvitationJoinGroup, action.options);
    yield put(cancleInvitationJoinGroupSuccess(action.options));
    CustomEventEmitter(CANCLE_INVITATION_JOIN_GROUP);
    SnackbarEmitter(SNACKBAR_VARIANT.SUCCESS, DEFAULT_MESSAGE.MUTATE.SUCCESS);
  } catch (error) {
    yield put(cancleInvitationJoinGroupFail(error, action.options));
    SnackbarEmitter(SNACKBAR_VARIANT.ERROR, get(error, 'message', DEFAULT_MESSAGE.MUTATE.ERROR));
  }
}

export {
  cancleInvitationJoinGroup,
}
