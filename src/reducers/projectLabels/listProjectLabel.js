import {
  LIST_PROJECT_LABEL,
  LIST_PROJECT_LABEL_SUCCESS,
  LIST_PROJECT_LABEL_FAIL,
} from "../../constants/actions/projectLabels/listProjectLabels";

export const initialState = {
  data: {
    projectLabels: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case LIST_PROJECT_LABEL:
      return {
        ...state,
        error: null,
        loading: action.quite ? false : true,
      };
    case LIST_PROJECT_LABEL_SUCCESS:
      return {
        ...state,
        data: action.data,
        error: null,
        loading: false,
        firstTime: false,
      };
    case LIST_PROJECT_LABEL_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
        firstTime: false,
      };

    default:
      return state;
  }
}

export default reducer;
