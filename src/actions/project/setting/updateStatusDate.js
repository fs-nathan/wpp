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

export const updateStatusDateSuccess = () => ({
  type: UPDATE_STATUS_DATE_SUCCESS,
});

export const updateStatusDateFail = (error) => ({
  type: UPDATE_STATUS_DATE_FAIL,
  error: error,
});