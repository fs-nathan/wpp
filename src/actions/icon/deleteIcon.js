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

export const deleteIconSuccess = () => ({
  type: DELETE_ICON_SUCCESS,
});

export const deleteIconFail = (error) => ({
  type: DELETE_ICON_FAIL,
  error: error,
});