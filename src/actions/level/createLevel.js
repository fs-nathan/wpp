import {
  CREATE_LEVEL,
  CREATE_LEVEL_SUCCESS,
  CREATE_LEVEL_FAIL,
} from '../../constants/actions/level/createLevel';

export const createLevel = ({ name, description }) => ({
  type: CREATE_LEVEL,
  options: {
    name,
    description,
  }
});

export const createLevelSuccess = ({ level }) => ({
  type: CREATE_LEVEL_SUCCESS,
  data: {
    level,
  },
});

export const createLevelFail = (error) => ({
  type: CREATE_LEVEL_FAIL,
  error: error,
});