import {
  RESEND_INVITATION_USER_JOIN_GROUP,
  RESEND_INVITATION_USER_JOIN_GROUP_FAIL,
  RESEND_INVITATION_USER_JOIN_GROUP_SUCCESS,
} from '../../constants/actions/groupUser/resendInvitationUserJoinGroup';

export const resendInvitationUserJoinGroup = ({ userId }) => ({
  type: RESEND_INVITATION_USER_JOIN_GROUP,
  options: {
    userId,
  },
});

export const resendInvitationUserJoinGroupSuccess = (options) => ({
  type: RESEND_INVITATION_USER_JOIN_GROUP_SUCCESS,
  options,
});

export const resendInvitationUserJoinGroupFail = (error, options) => ({
  type: RESEND_INVITATION_USER_JOIN_GROUP_FAIL,
  options,
  error,
});