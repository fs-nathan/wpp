import {
  DETAIL_STATUS,
  DETAIL_STATUS_FAIL,
  DETAIL_STATUS_SUCCESS,
  DETAIL_STATUS_RESET,
} from '../../../constants/actions/project/setting/detailStatus';
import { apiService } from '../../../constants/axiosInstance';

export const detailStatus = ({ projectId }, quite = false) => ({
  type: DETAIL_STATUS,
  quite,
  options: {
    projectId,
  },
});

export const detailStatusSuccess = ({ status }, options) => ({
  type: DETAIL_STATUS_SUCCESS,
  options,
  data: {
    status,
  }
});

export const detailStatusFail = (error, options) => ({
  type: DETAIL_STATUS_FAIL,
  options,
  error,
});

export const detailStatusReset = () => ({
  type: DETAIL_STATUS_RESET,
})

export const getProjectSetting = projectId => {
  const config = {
    url: '/project/setting/detail?project_id=' + projectId,
    method: 'get'
  };
  return apiService(config);
};