import {
  GET_LIST_INVITATION_SENT,
  GET_LIST_INVITATION_SENT_FAIL,
  GET_LIST_INVITATION_SENT_SUCCESS,
  GET_LIST_INVITATION_SENT_RESET,
} from '../../constants/actions/groupUser/getListInvitationSent';

export const getListInvitationSent = (quite = false) => ({
  type: GET_LIST_INVITATION_SENT,
  quite,
});

export const getListInvitationSentSuccess = ({ invitations }, options) => ({
  type: GET_LIST_INVITATION_SENT_SUCCESS,
  options,
  data: {
    invitations,
  }
});

export const getListInvitationSentFail = (error, options) => ({
  type: GET_LIST_INVITATION_SENT_FAIL,
  options,
  error,
});

export const getListInvitationSentReset = () => ({
  type: GET_LIST_INVITATION_SENT_RESET,
})