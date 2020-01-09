import {
  CANCLE_INVITATION_JOIN_GROUP,
  CANCLE_INVITATION_JOIN_GROUP_FAIL,
  CANCLE_INVITATION_JOIN_GROUP_SUCCESS,
} from '../../constants/actions/groupUser/cancleInvitationJoinGroup';

export const cancleInvitationJoinGroup = ({ invitationId }) => ({
  type: CANCLE_INVITATION_JOIN_GROUP,
  options: {
    invitationId,
  },
});

export const cancleInvitationJoinGroupSuccess = () => ({
  type: CANCLE_INVITATION_JOIN_GROUP_SUCCESS,
});

export const cancleInvitationJoinGroupFail = (error) => ({
  type: CANCLE_INVITATION_JOIN_GROUP_FAIL,
  error: error,
});