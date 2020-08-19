import {
  INVITE_USER_JOIN_GROUP,
  INVITE_USER_JOIN_GROUP_FAIL,
  INVITE_USER_JOIN_GROUP_SUCCESS,
} from '../../constants/actions/groupUser/inviteUserJoinGroup';

export const inviteUserJoinGroup = ({ userId }) => ({
  type: INVITE_USER_JOIN_GROUP,
  options: {
    userId,
  },
});

export const inviteUserJoinGroupSuccess = (options) => ({
  type: INVITE_USER_JOIN_GROUP_SUCCESS,
  options,
});

export const inviteUserJoinGroupFail = (error, options) => ({
  type: INVITE_USER_JOIN_GROUP_FAIL,
  options,
  error,
});