import {
  UPDATE_VALUE_COLUMNS,
  UPDATE_VALUE_COLUMNS_FAIL,
  UPDATE_VALUE_COLUMNS_SUCCESS,
} from "../../constants/actions/columns/updateValueColumns";

export const updateValueColumns = (
  options,
  callbackSuccess,
  callbackFailed
) => ({
  type: UPDATE_VALUE_COLUMNS,
  options,
  callbackSuccess,
  callbackFailed,
});

export const updateValueColumnsSuccess = ({ task }, options) => ({
  type: UPDATE_VALUE_COLUMNS_SUCCESS,
  options,
  data: {
    task,
  },
});

export const updateValueColumnsFail = (error, options) => ({
  type: UPDATE_VALUE_COLUMNS_FAIL,
  options,
  error,
});
