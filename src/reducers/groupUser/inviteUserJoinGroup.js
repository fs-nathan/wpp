import {
  INVITE_USER_JOIN_GROUP,
  INVITE_USER_JOIN_GROUP_SUCCESS,
  INVITE_USER_JOIN_GROUP_FAIL,
} from '../../constants/actions/groupUser/inviteUserJoinGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case INVITE_USER_JOIN_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case INVITE_USER_JOIN_GROUP_SUCCESS: 
      return {
        ...state, 
        data: {},
        error: null,
        loading: false,
      };
    case INVITE_USER_JOIN_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;