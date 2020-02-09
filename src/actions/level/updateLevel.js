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

export const updateLevelSuccess = ({ level }) => ({
  type: UPDATE_LEVEL_SUCCESS,
  data: {
    level,
  }
});

export const updateLevelFail = (error) => ({
  type: UPDATE_LEVEL_FAIL,
  error: error,
});