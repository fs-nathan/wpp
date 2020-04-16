import { UPDATE_USER, UPDATE_USER_FAIL, UPDATE_USER_SUCCESS } from '../../constants/actions/user/updateUser';

export const initialState = {
  data: {},
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: {},
        error: null,
        loading: false,
      };
    case UPDATE_USER_FAIL:
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