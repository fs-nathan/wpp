import { MEMBER_PROJECT_GROUP, MEMBER_PROJECT_GROUP_FAIL, MEMBER_PROJECT_GROUP_RESET, MEMBER_PROJECT_GROUP_SUCCESS } from '../../constants/actions/projectGroup/memberProjectGroup';

export const initialState = {
  data: {
    members: [],
  },
  error: null,
  loading: false,
  firstTime: true,
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
        firstTime: false,
      };
    case MEMBER_PROJECT_GROUP_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };
    case MEMBER_PROJECT_GROUP_RESET:
      return initialState;
    default:
      return state;
  }
}

export default reducer;