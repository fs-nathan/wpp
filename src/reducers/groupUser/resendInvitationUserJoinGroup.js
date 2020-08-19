import { RESEND_INVITATION_USER_JOIN_GROUP, RESEND_INVITATION_USER_JOIN_GROUP_FAIL, RESEND_INVITATION_USER_JOIN_GROUP_SUCCESS } from '../../constants/actions/groupUser/resendInvitationUserJoinGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case RESEND_INVITATION_USER_JOIN_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case RESEND_INVITATION_USER_JOIN_GROUP_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case RESEND_INVITATION_USER_JOIN_GROUP_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;