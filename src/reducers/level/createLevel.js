import { CREATE_LEVEL, CREATE_LEVEL_FAIL, CREATE_LEVEL_SUCCESS } from '../../constants/actions/level/createLevel';

export const initialState = {
  data: {
    level: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_LEVEL:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_LEVEL_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_LEVEL_FAIL:
      return {
        ...state,
        ...initialState,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}

export default reducer;