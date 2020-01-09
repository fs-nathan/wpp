import {
  INVITE_USER_JOIN_GROUP,
  INVITE_USER_JOIN_GROUP_FAIL,
  INVITE_USER_JOIN_GROUP_SUCCESS,
} from '../../constants/actions/user/inviteUserJoinGroup';

export const inviteUserJoinGroup = ({ userId }) => ({
  type: INVITE_USER_JOIN_GROUP,
  options: {
    userId,
  },
});

export const inviteUserJoinGroupSuccess = () => ({
  type: INVITE_USER_JOIN_GROUP_SUCCESS,
});

export const inviteUserJoinGroupFail = (error) => ({
  type: INVITE_USER_JOIN_GROUP_FAIL,
  error: error,
});