import {
  UPDATE_COLUMNS,
  UPDATE_COLUMNS_FAIL,
  UPDATE_COLUMNS_SUCCESS,
} from "../../constants/actions/columns/updateColumns";

export const updateColumns = (options, callbackSuccess) => ({
  type: UPDATE_COLUMNS,
  options,
  callbackSuccess,
});

export const updateColumnsSuccess = ({ task }, options) => ({
  type: UPDATE_COLUMNS_SUCCESS,
  options,
  data: {
    task,
  },
});

export const updateColumnsFail = (error, options) => ({
  type: UPDATE_COLUMNS_FAIL,
  options,
  error,
});
