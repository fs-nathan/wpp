import { DELETE_DOCUMENTS_USER, DELETE_DOCUMENTS_USER_FAIL, DELETE_DOCUMENTS_USER_SUCCESS } from '../../constants/actions/user/deleteDocumentsUser';

export const initialState = {
  data: null,
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case DELETE_DOCUMENTS_USER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case DELETE_DOCUMENTS_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
        error: null,
        loading: false,
      };
    case DELETE_DOCUMENTS_USER_FAIL:
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