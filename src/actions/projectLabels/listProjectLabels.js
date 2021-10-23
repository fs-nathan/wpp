import {
  LIST_PROJECT_LABEL,
  LIST_PROJECT_LABEL_SUCCESS,
  LIST_PROJECT_LABEL_FAIL,
} from "constants/actions/projectLabels/listProjectLabels";
import { apiService } from "../../constants/axiosInstance";

export const listProjectLabel = (data, quite = false) => ({
  type: LIST_PROJECT_LABEL,
  quite,
  options: {},
});

export const listProjectLabelSuccess = ({ labels }, options) => {
  return {
    type: LIST_PROJECT_LABEL_SUCCESS,
    options,
    data: {
      labels,
    },
  };
};

export const listProjectLabelFail = (error, options) => ({
  type: LIST_PROJECT_LABEL_FAIL,
  options,
  error,
});

export const fetchListProjectLabel = (params) => {
  const config = {
    url: "/project-label/list",
    method: "get",
    params,
  };
  return apiService(config);
};
