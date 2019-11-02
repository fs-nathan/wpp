import {
  REMOVE_MEMBER_PROJECT,
  REMOVE_MEMBER_PROJECT_SUCCESS,
  REMOVE_MEMBER_PROJECT_FAIL,
} from '../../constants/actions/project/removeMemberProject';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case REMOVE_MEMBER_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case REMOVE_MEMBER_PROJECT_SUCCESS: 
      return {
        ...state, 
        error: null,
        loading: false,
      };
    case REMOVE_MEMBER_PROJECT_FAIL:
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