import {
  CREATE_COLUMNS,
  CREATE_COLUMNS_FAIL,
  CREATE_COLUMNS_SUCCESS,
} from "../../constants/actions/columns/createColumns";

export const createColumns = (options, callbackSuccess) => ({
  type: CREATE_COLUMNS,
  options,
  callbackSuccess,
});

export const createColumnsSuccess = ({ task }, options) => ({
  type: CREATE_COLUMNS_SUCCESS,
  options,
  data: {
    task,
  },
});

export const createColumnsFail = (error, options) => ({
  type: CREATE_COLUMNS_FAIL,
  options,
  error,
});
