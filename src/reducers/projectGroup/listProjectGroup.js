import {
  LIST_PROJECT_GROUP,
  LIST_PROJECT_GROUP_SUCCESS,
  LIST_PROJECT_GROUP_FAIL,
} from '../../constants/actions/projectGroup/listProjectGroup';

export const initialState = {
  data: {
    projectGroups: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LIST_PROJECT_GROUP_SUCCESS: 
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_PROJECT_GROUP_FAIL:
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