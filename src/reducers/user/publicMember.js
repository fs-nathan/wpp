import {
  PUBLIC_MEMBER,
  PUBLIC_MEMBER_SUCCESS,
  PUBLIC_MEMBER_FAIL,
} from '../../constants/actions/user/publicMember';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case PUBLIC_MEMBER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case PUBLIC_MEMBER_SUCCESS: 
      return {
        ...state, 
        data: {},
        error: null,
        loading: false,
      };
    case PUBLIC_MEMBER_FAIL:
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