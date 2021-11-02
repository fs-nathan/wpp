import {
  EDIT_PROJECT_LABELS,
  EDIT_PROJECT_LABELS_SUCCESS,
  EDIT_PROJECT_LABELS_FAIL,
} from "../../constants/actions/projectLabels/editProjectLabels";

export const updateProjectLabels = ({ label_id, name, color }) => {
  return {
    type: EDIT_PROJECT_LABELS,
    options: {
      label_id,
      name,
      color,
    },
  };
};

export const updateProjectLabelsSuccess = ({ label }, options) => {
  return {
    type: EDIT_PROJECT_LABELS_SUCCESS,
    options,
    data: {
      label,
    },
  };
};

export const updateProjectLabelsFail = (error, options) => ({
  type: EDIT_PROJECT_LABELS_FAIL,
  options,
  error,
});
