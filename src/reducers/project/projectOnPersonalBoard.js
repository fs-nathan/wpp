import {
  GET_PROJECT_PERSONAL_BOARD_SUCCESS,
  GET_PROJECT_PERSONAL_BOARD_FAIL,
  GET_PROJECT_PERSONAL_BOARD
} from '../../constants/actions/project/projectOnPersonalBoard';

export const initialState = {
  projects: [],
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_PERSONAL_BOARD:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case GET_PROJECT_PERSONAL_BOARD_SUCCESS:
      return {
        ...state,
        projects: action.data,
        error: null,
        loading: false,
      };
    case GET_PROJECT_PERSONAL_BOARD_FAIL:
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