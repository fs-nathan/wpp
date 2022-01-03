import {
  GET_LIST_COLUMNS,
  GET_LIST_COLUMNS_RESET,
  GET_LIST_COLUMNS_SUCCESS,
  GET_LIST_COLUMNS_FAIL,
} from "constants/actions/columns/listColumns";

export const listColumns = ({ projectId }, quite = false) => ({
  type: GET_LIST_COLUMNS,
  quite,
  options: {
    projectId,
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
