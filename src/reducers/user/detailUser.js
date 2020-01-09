import {
  DETAIL_USER,
  DETAIL_USER_SUCCESS,
  DETAIL_USER_FAIL,
} from '../../constants/actions/user/detailUser';
import { PUBLIC_MEMBER } from '../../constants/actions/user/publicMember';
import { PRIVATE_MEMBER } from '../../constants/actions/user/privateMember';

export const initialState = {
  data: {  
    user: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  let user = null;
  switch (action.type) {
    case DETAIL_USER:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case DETAIL_USER_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_USER_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case PUBLIC_MEMBER:
      user = {
        ...state.data.user,
        state: 1,
      };
      return {
        ...state,
        data: {
          user,
        },
      };
    case PRIVATE_MEMBER:
      user = {
        ...state.data.user,
        state: 0,
      };
      return {
        ...state,
        data: {
          user,
        },
      };
    default:
      return state;
  }
}

export default reducer;