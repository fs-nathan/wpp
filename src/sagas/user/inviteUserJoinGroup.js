import { call, put } from 'redux-saga/effects';
import { inviteUserJoinGroupSuccess, inviteUserJoinGroupFail } from '../../actions/user/inviteUserJoinGroup';
import { apiService } from '../../constants/axiosInstance';
import { CustomEventEmitter, INVITE_USER_JOIN_GROUP } from '../../constants/events';

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
    yield put(inviteUserJoinGroupSuccess());
    CustomEventEmitter(INVITE_USER_JOIN_GROUP);
  } catch (error) {
    yield put(inviteUserJoinGroupFail(error));
  }
}

export {
  inviteUserJoinGroup,
}
