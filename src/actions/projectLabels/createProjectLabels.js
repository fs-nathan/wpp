import {
  CREATE_PROJECT_LABELS,
  CREATE_PROJECT_LABELS_FAIL,
  CREATE_PROJECT_LABELS_SUCCESS,
} from "../../constants/actions/projectLabels/createProjectLabels";

export const createProjectLabels = ({ name, color }) => ({
  type: CREATE_PROJECT_LABELS,
  options: {
    name,
    color,
  },
});

export const createProjectLabelsSuccess = ({ label }, options) => ({
  type: CREATE_PROJECT_LABELS_SUCCESS,
  options,
  data: {
    label,
  },
});

export const createProjectLabelsFail = (error, options) => ({
  type: CREATE_PROJECT_LABELS_FAIL,
  options,
  error,
});
