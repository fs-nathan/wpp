import {
  UPDATE_MAJOR,
  UPDATE_MAJOR_SUCCESS,
  UPDATE_MAJOR_FAIL,
} from '../../constants/actions/major/updateMajor';

export const initialState = {
  data: {
    major: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_MAJOR:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_MAJOR_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case UPDATE_MAJOR_FAIL:
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