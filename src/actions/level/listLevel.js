import {
  LIST_LEVEL,
  LIST_LEVEL_SUCCESS,
  LIST_LEVEL_FAIL,
} from '../../constants/actions/level/listLevel';

export const listLevel = (quite = false) => ({
  type: LIST_LEVEL,
  quite,
});

export const listLevelSuccess = ({ levels }) => ({
  type: LIST_LEVEL_SUCCESS,
  data: {
    levels,
  },
});

export const listLevelFail = (error) => ({
  type: LIST_LEVEL_FAIL,
  error: error,
});