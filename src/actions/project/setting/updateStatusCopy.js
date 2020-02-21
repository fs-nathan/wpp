import {
  UPDATE_STATUS_COPY,
  UPDATE_STATUS_COPY_FAIL,
  UPDATE_STATUS_COPY_SUCCESS,
} from '../../../constants/actions/project/setting/updateStatusCopy';

export const updateStatusCopy = ({ projectId, status }) => ({
  type: UPDATE_STATUS_COPY,
  options: {
    projectId,
    status,
  },
});

export const updateStatusCopySuccess = (options) => ({
  type: UPDATE_STATUS_COPY_SUCCESS,
  options,
});

export const updateStatusCopyFail = (error, options) => ({
  type: UPDATE_STATUS_COPY_FAIL,
  options,
  error,
});