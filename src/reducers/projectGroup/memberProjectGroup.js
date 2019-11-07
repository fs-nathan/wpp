import {
  MEMBER_PROJECT_GROUP,
  MEMBER_PROJECT_GROUP_SUCCESS,
  MEMBER_PROJECT_GROUP_FAIL,
} from '../../constants/actions/projectGroup/memberProjectGroup';

export const initialState = {
  data: {
    members: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case MEMBER_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case MEMBER_PROJECT_GROUP_SUCCESS: 
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case MEMBER_PROJECT_GROUP_FAIL:
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