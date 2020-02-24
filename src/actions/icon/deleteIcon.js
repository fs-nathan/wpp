import {
  DELETE_ICON,
  DELETE_ICON_FAIL,
  DELETE_ICON_SUCCESS,
} from '../../constants/actions/icon/deleteIcon';

export const deleteIcon = ({ iconId }) => ({
  type: DELETE_ICON,
  options: {
    iconId,
  }
});

export const deleteIconSuccess = (options) => ({
  type: DELETE_ICON_SUCCESS,
  options,
});

export const deleteIconFail = (error, options) => ({
  type: DELETE_ICON_FAIL,
  options,
  error,
});