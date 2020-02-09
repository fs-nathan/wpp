import {
  CREATE_MAJOR,
  CREATE_MAJOR_SUCCESS,
  CREATE_MAJOR_FAIL,
} from '../../constants/actions/major/createMajor';

export const initialState = {
  data: {
    major: null,  
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_MAJOR:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_MAJOR_SUCCESS: 
      return {
        ...state, 
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_MAJOR_FAIL:
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