import { UPLOAD_DOCUMENTS_USER, UPLOAD_DOCUMENTS_USER_FAIL, UPLOAD_DOCUMENTS_USER_SUCCESS } from '../../constants/actions/user/uploadDocumentsUser';

export const initialState = {
  data: {
    documents: [],
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPLOAD_DOCUMENTS_USER:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case UPLOAD_DOCUMENTS_USER_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        error: null,
        loading: false,
      };
    case UPLOAD_DOCUMENTS_USER_FAIL:
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