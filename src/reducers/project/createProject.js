import {
  CREATE_PROJECT,
  CREATE_PROJECT_FAIL,
  CREATE_PROJECT_SUCCESS,
} from "../../constants/actions/project/createProject";

export const initialState = {
  data: {
    project: null,
  },
  status: "",
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_PROJECT_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: action.data,
        status: CREATE_PROJECT_SUCCESS,
        error: null,
        loading: false,
      };
    case CREATE_PROJECT_FAIL:
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
