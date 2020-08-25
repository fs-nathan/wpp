import { ADD_PROJECT_ROLE_TO_MEMBER, ADD_PROJECT_ROLE_TO_MEMBER_FAIL, ADD_PROJECT_ROLE_TO_MEMBER_SUCCESS } from '../../constants/actions/project/addProjectRoleToMember';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT_ROLE_TO_MEMBER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ADD_PROJECT_ROLE_TO_MEMBER_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case ADD_PROJECT_ROLE_TO_MEMBER_FAIL:
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