import {
  PRIVATE_MEMBER,
  PRIVATE_MEMBER_SUCCESS,
  PRIVATE_MEMBER_FAIL,
} from '../../constants/actions/user/privateMember';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case PRIVATE_MEMBER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case PRIVATE_MEMBER_SUCCESS: 
      return {
        ...state, 
        data: {},
        error: null,
        loading: false,
      };
    case PRIVATE_MEMBER_FAIL:
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