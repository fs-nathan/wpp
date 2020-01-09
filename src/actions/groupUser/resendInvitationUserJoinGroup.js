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

export const resendInvitationUserJoinGroupSuccess = () => ({
  type: RESEND_INVITATION_USER_JOIN_GROUP_SUCCESS,
});

export const resendInvitationUserJoinGroupFail = (error) => ({
  type: RESEND_INVITATION_USER_JOIN_GROUP_FAIL,
  error: error,
});