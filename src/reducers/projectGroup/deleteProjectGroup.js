import {
  DELETE_PROJECT_GROUP,
  DELETE_PROJECT_GROUP_SUCCESS,
  DELETE_PROJECT_GROUP_FAIL,
} from '../../constants/actions/projectGroup/deleteProjectGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_PROJECT_GROUP_SUCCESS: 
      return {
        ...state,
        error: null,
        loading: false,
      };
    case DELETE_PROJECT_GROUP_FAIL:
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