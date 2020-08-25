import { ADD_MEMBER_PROJECT, ADD_MEMBER_PROJECT_FAIL, ADD_MEMBER_PROJECT_SUCCESS } from '../../constants/actions/project/addMemberProject';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MEMBER_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ADD_MEMBER_PROJECT_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case ADD_MEMBER_PROJECT_FAIL:
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