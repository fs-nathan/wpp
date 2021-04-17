import * as actionTypes from '../../constants/actions/chat/chat';
import { apiService } from '../../constants/axiosInstance';

export const getListGroupOffer = params => {
  const config = {
    url: '/offers/list-group-offer',
    method: 'get',
    params
  };
  return apiService(config);
};