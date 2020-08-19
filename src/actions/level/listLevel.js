import {
  LIST_LEVEL,
  LIST_LEVEL_SUCCESS,
  LIST_LEVEL_FAIL,
  LIST_LEVEL_RESET,
} from '../../constants/actions/level/listLevel';

export const listLevel = (quite = false) => ({
  type: LIST_LEVEL,
  quite,
});

export const listLevelSuccess = ({ levels }, options) => ({
  type: LIST_LEVEL_SUCCESS,
  options,
  data: {
    levels,
  },
});

export const listLevelFail = (error, options) => ({
  type: LIST_LEVEL_FAIL,
  options,
  error: error,
});

export const listLevelReset = () => ({
  type: LIST_LEVEL_RESET,
});