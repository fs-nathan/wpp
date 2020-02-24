import {
  UPDATE_STATUS_DATE,
  UPDATE_STATUS_DATE_FAIL,
  UPDATE_STATUS_DATE_SUCCESS,
} from '../../../constants/actions/project/setting/updateStatusDate';

export const updateStatusDate = ({ projectId, status }) => ({
  type: UPDATE_STATUS_DATE,
  options: {
    projectId,
    status,
  },
});

export const updateStatusDateSuccess = (options) => ({
  type: UPDATE_STATUS_DATE_SUCCESS,
  options,
});

export const updateStatusDateFail = (error, options) => ({
  type: UPDATE_STATUS_DATE_FAIL,
  options,
  error,
});