import {
  LIST_PROJECT_LABEL,
  LIST_PROJECT_LABEL_SUCCESS,
  LIST_PROJECT_LABEL_FAIL,
} from "../../constants/actions/projectLabels/listProjectLabels";

import { EDIT_PROJECT_LABELS_SUCCESS } from "../../constants/actions/projectLabels/editProjectLabels";
import { CREATE_PROJECT_LABELS_SUCCESS } from "../../constants/actions/projectLabels/createProjectLabels";

export const initialState = {
  data: {
    projectLabels: [],
  },
  error: null,
  loading: false,
  firstTime: true,
};

function reducer(state = initialState, action) {
  const newProjectLabels = [...state.data.projectLabels];
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
        data: { projectLabels: action.data.labels },
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
    case EDIT_PROJECT_LABELS_SUCCESS:
      const index = newProjectLabels.findIndex(
        (item) => action.data.label.id === item.id
      );
      newProjectLabels[index] = { ...action.data.label };

      return {
        ...state,
        data: { projectLabels: newProjectLabels },
        error: null,
        loading: false,
        firstTime: false,
      };
    case CREATE_PROJECT_LABELS_SUCCESS:
      return {
        ...state,
        data: { projectLabels: [...newProjectLabels, action.data.label] },
        error: null,
        loading: false,
        firstTime: false,
      };

    default:
      return state;
  }
}

export default reducer;
