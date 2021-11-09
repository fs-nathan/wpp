import {
  CREATE_PROJECT_LABELS,
  CREATE_PROJECT_LABELS_FAIL,
  CREATE_PROJECT_LABELS_SUCCESS,
} from "../../constants/actions/projectLabels/createProjectLabels";

export const initialState = {
  data: {
    projectLabel: null,
  },
  error: null,
  loading: false,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_PROJECT_LABELS:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case CREATE_PROJECT_LABELS_SUCCESS:
      return {
        ...state,
        ...initialState,
        data: { projectLabel: action.data.label },
        error: null,
        loading: false,
      };
    case CREATE_PROJECT_LABELS_FAIL:
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
