import {
  UPDATE_LEVEL,
  UPDATE_LEVEL_SUCCESS,
  UPDATE_LEVEL_FAIL,
} from '../../constants/actions/level/updateLevel';

export const updateLevel = ({ levelId, name, description }) => ({
  type: UPDATE_LEVEL,
  options: {
    levelId,
    name,
    description,
  }
});

export const updateLevelSuccess = ({ level }, options) => ({
  type: UPDATE_LEVEL_SUCCESS,
  options,
  data: {
    level,
  }
});

export const updateLevelFail = (error, options) => ({
  type: UPDATE_LEVEL_FAIL,
  options,
  error,
});