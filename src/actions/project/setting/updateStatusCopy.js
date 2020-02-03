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

export const updateStatusCopySuccess = () => ({
  type: UPDATE_STATUS_COPY_SUCCESS,
});

export const updateStatusCopyFail = (error) => ({
  type: UPDATE_STATUS_COPY_FAIL,
  error: error,
});