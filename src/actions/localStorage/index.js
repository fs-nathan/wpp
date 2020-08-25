import { RESET, SET_PROJECT, SET_PROJECT_GROUP } from 'constants/actions/localStorage';

export const setProject = (value) => ({
  type: SET_PROJECT,
  value,
});

export const setProjectGroup = (value) => ({
  type: SET_PROJECT_GROUP,
  value,
});

export const reset = () => ({
  type: RESET,
});