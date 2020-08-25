import { CREATE_POSITION, CREATE_POSITION_FAIL, CREATE_POSITION_SUCCESS } from '../../constants/actions/position/createPosition';

export const initialState = {
  data: {
    position: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_POSITION:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_POSITION_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case CREATE_POSITION_FAIL:
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