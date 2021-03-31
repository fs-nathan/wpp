import {
  GET_PROJECT_STATUS_WORK_SUCCESS,
  GET_PROJECT_STATUS_WORK_FAIL,
  GET_PROJECT_STATUS_WORK
} from '../../constants/actions/project/getStatusWork';

export const getStatusWorkGroup = () => ({
  type: GET_PROJECT_STATUS_WORK,
});

export const getStatusWorkGroupSuccess = ({ data }) => ({
  type: GET_PROJECT_STATUS_WORK_SUCCESS,
  data
});

export const getStatusWorkGroupFail = (error) => ({
  type: GET_PROJECT_STATUS_WORK_FAIL,
  error,
});