import {
  DELETE_LEVEL,
  DELETE_LEVEL_SUCCESS,
  DELETE_LEVEL_FAIL,
} from '../../constants/actions/level/deleteLevel';

export const deleteLevel = ({ levelId }) => ({
  type: DELETE_LEVEL,
  options: {
    levelId,
  }
});

export const deleteLevelSuccess = (options) => ({
  type: DELETE_LEVEL_SUCCESS,
  options,
});

export const deleteLevelFail = (error, options) => ({
  type: DELETE_LEVEL_FAIL,
  options,
  error,
});