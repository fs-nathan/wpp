import {
  BAN_USER_FROM_GROUP,
  BAN_USER_FROM_GROUP_SUCCESS,
  BAN_USER_FROM_GROUP_FAIL,
} from '../../constants/actions/user/banUserFromGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case BAN_USER_FROM_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case BAN_USER_FROM_GROUP_SUCCESS: 
      return {
        ...state, 
        data: {},
        error: null,
        loading: false,
      };
    case BAN_USER_FROM_GROUP_FAIL:
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