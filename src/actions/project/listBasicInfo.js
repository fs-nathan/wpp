import { LIST_PROJECT_BASIC_INFO, LIST_PROJECT_BASIC_INFO_FAIL, LIST_PROJECT_BASIC_INFO_SUCCESS } from '../../constants/actions/project/listBasic';

export const listProjectBasicInfo = (quite = false) => ({
  type: LIST_PROJECT_BASIC_INFO,
  quite,
  options: {
  },
});

export const listProjectBasicInfoSuccess = ({ projects }, options) => ({
  type: LIST_PROJECT_BASIC_INFO_SUCCESS,
  options,
  data: {
    projects
  }
});

export const listProjectBasicInfoFail = (error, options) => ({
  type: LIST_PROJECT_BASIC_INFO_FAIL,
  options,
  error,
});