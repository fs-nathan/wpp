import {
  GET_WORK_TYPE, GET_WORK_TYPE_FAIL, GET_WORK_TYPE_SUCCESS
} from '../../constants/actions/project/getWorkType';

export const getWorkType = ({ projectId }) => ({
  type: GET_WORK_TYPE,
  options: {
    projectId,
  },
});

export const getWorkTypeSuccess = (options) => ({
  type: GET_WORK_TYPE_SUCCESS,
  options
});

export const getWorkTypeFail = (error, options) => ({
  type: GET_WORK_TYPE_FAIL,
  options,
  error,
});