import {
  REMOVE_PROJECT_ROLE_FROM_MEMBER,
  REMOVE_PROJECT_ROLE_FROM_MEMBER_SUCCESS,
  REMOVE_PROJECT_ROLE_FROM_MEMBER_FAIL,
} from '../../constants/actions/project/removeProjectRoleFromMember';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_PROJECT_ROLE_FROM_MEMBER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REMOVE_PROJECT_ROLE_FROM_MEMBER_SUCCESS: 
      return {
        ...state, 
        error: null,
        loading: false,
      };
    case REMOVE_PROJECT_ROLE_FROM_MEMBER_FAIL:
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