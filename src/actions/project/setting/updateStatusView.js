import { UPDATE_STATUS_VIEW, UPDATE_STATUS_VIEW_FAIL, UPDATE_STATUS_VIEW_SUCCESS } from '../../../constants/actions/project/setting/updateStatusView';

export const updateStatusView = ({ projectId, status }) => ({
  type: UPDATE_STATUS_VIEW,
  options: {
    projectId,
    status,
  },
});

export const updateStatusViewSuccess = (options) => ({
  type: UPDATE_STATUS_VIEW_SUCCESS,
  options,
});

export const updateStatusViewFail = (error, options) => ({
  type: UPDATE_STATUS_VIEW_FAIL,
  options,
  error,
});