import {
  LIST_MAJOR,
  LIST_MAJOR_SUCCESS,
  LIST_MAJOR_FAIL,
} from '../../constants/actions/major/listMajor';

export const initialState = {
  data: {
    majors: [],  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_MAJOR:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case LIST_MAJOR_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case LIST_MAJOR_FAIL:
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