import { CANCLE_INVITATION_JOIN_GROUP, CANCLE_INVITATION_JOIN_GROUP_FAIL, CANCLE_INVITATION_JOIN_GROUP_SUCCESS } from '../../constants/actions/groupUser/cancleInvitationJoinGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CANCLE_INVITATION_JOIN_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CANCLE_INVITATION_JOIN_GROUP_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case CANCLE_INVITATION_JOIN_GROUP_FAIL:
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