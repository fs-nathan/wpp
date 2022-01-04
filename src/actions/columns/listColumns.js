import {
  GET_LIST_COLUMNS,
  GET_LIST_COLUMNS_RESET,
  GET_LIST_COLUMNS_SUCCESS,
  GET_LIST_COLUMNS_FAIL,
} from "constants/actions/columns/listColumns";

export const listColumns = ({ project_id }, quite = false) => ({
  type: GET_LIST_COLUMNS,
  quite,
  options: {
    project_id,
  },
});

export const listColumnsSuccess = ({ data }, options) => ({
  type: GET_LIST_COLUMNS_SUCCESS,
  options,
  data,
});

export const listColumnsFail = (error, options) => ({
  type: GET_LIST_COLUMNS_FAIL,
  options,
  error,
});

export const listColumnsReset = () => ({
  type: GET_LIST_COLUMNS_RESET,
});
