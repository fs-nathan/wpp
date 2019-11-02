import {
  EDIT_PROJECT_GROUP,
  EDIT_PROJECT_GROUP_SUCCESS,
  EDIT_PROJECT_GROUP_FAIL,
} from '../../constants/actions/projectGroup/editProjectGroup';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_PROJECT_GROUP:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case EDIT_PROJECT_GROUP_SUCCESS: 
      return {
        ...state,
        error: null,
        loading: false,
      };
    case EDIT_PROJECT_GROUP_FAIL:
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