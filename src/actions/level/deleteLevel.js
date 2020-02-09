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

export const deleteLevelSuccess = () => ({
  type: DELETE_LEVEL_SUCCESS,
});

export const deleteLevelFail = (error) => ({
  type: DELETE_LEVEL_FAIL,
  error: error,
});