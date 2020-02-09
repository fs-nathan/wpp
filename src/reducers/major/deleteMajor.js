import {
  DELETE_MAJOR,
  DELETE_MAJOR_SUCCESS,
  DELETE_MAJOR_FAIL,
} from '../../constants/actions/major/deleteMajor';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_MAJOR:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_MAJOR_SUCCESS: 
      return {
        ...state, 
        data: {},
        error: null,
        loading: false,
      };
    case DELETE_MAJOR_FAIL:
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