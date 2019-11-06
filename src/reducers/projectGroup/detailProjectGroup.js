import {
  DETAIL_PROJECT_GROUP,
  DETAIL_PROJECT_GROUP_SUCCESS,
  DETAIL_PROJECT_GROUP_FAIL,
} from '../../constants/actions/projectGroup/detailProjectGroup';

export const initialState = {
  data: {
    projectGroup: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DETAIL_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DETAIL_PROJECT_GROUP_SUCCESS: 
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
      };
    case DETAIL_PROJECT_GROUP_FAIL:
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