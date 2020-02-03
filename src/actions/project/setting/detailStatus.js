import {
  DETAIL_STATUS,
  DETAIL_STATUS_FAIL,
  DETAIL_STATUS_SUCCESS,
} from '../../../constants/actions/project/setting/detailStatus';

export const detailStatus = ({ projectId }, quite = false) => ({
  type: DETAIL_STATUS,
  quite,
  options: {
    projectId,
  },
});

export const detailStatusSuccess = ({ status }) => ({
  type: DETAIL_STATUS_SUCCESS,
  data: {
    status,
  }
});

export const detailStatusFail = (error) => ({
  type: DETAIL_STATUS_FAIL,
  error: error,
});