import {
  MEMBER_PROJECT,
  MEMBER_PROJECT_SUCCESS,
  MEMBER_PROJECT_FAIL,
} from '../../constants/actions/project/memberProject';

export const initialState = {
  data: {
    membersAdded: [],
    membersFree: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_PROJECT:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case MEMBER_PROJECT_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case MEMBER_PROJECT_FAIL:
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