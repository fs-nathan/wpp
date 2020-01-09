import { apiService } from '../../constants/axiosInstance';
import * as actionTypes from '../../constants/actions/setting/setting';

// setting account
export const actionSettingAccount = typeSetting => ({
  type: actionTypes.CHANGE_SETTING_ACCOUNT,
  payload: typeSetting
});
export const actionNotificationSelected = notification => ({
  type: actionTypes.SELECTED_NOTIFICATION,
  payload: notification
});

export const actionUpdateColorGroup = color => {
  return apiService({
    url: '/update-color-group',
    method: 'post',
    data: { color }
  });
};
export const actionChangeLoading = isLoading => ({
  type: actionTypes.CHANGE_LOADING,
  payload: isLoading
});

// setting group
export const actionSettingGroup = type => ({
  type: actionTypes.CHANGE_SETTING_GROUP,
  payload: type
});

export const actionFetchGroupDetail = (quite = false) => ({
  type: actionTypes.FETCH_GROUP_DETAIL,
  quite
});

export const actionUpdateGroupInfo = (data = {}) => {
  return apiService({
    url: '/update-group-detail',
    method: 'post',
    data
  });
};

export const actionUpdateLogoGroup = formData => {
  return apiService({
    url: '/update-logo-group',
    method: 'post',
    data: formData
  });
};

export const actionUpdateCoverGroup = formData => {
  return apiService({
    url: '/update-cover-group',
    method: 'post',
    data: formData
  });
};

export const orderService = params => {
  return apiService({
    url: '/orders/list',
    method: 'get',
    params
  });
};
export const actionGetOrder = orders => ({
  type: actionTypes.FETCH_ORDER_LIST,
  payload: orders
});
export const orderDetailService = params => {
  return apiService({
    url: '/orders/detail',
    method: 'get',
    params
  });
};

export const orderCreateService = data => {
  return apiService({
    url: '/orders/create',
    method: 'post',
    data
  });
};
export const orderDeleteService = data => {
  return apiService({
    url: '/orders/delete',
    method: 'delete',
    data
  });
};
export const extentOrderService = data => {
  return apiService({
    url: 'orders/extend',
    method: 'post',
    data
  });
};
export const billService = params => {
  return apiService({
    url: '/orders/bill-info',
    method: 'get',
    params
  });
};
export const actionGetBill = orders => ({
  type: actionTypes.FETCH_BILL,
  payload: orders
});
export const updateBillService = data => {
  return apiService({
    url: '/orders/update-bill-info',
    method: 'post',
    data
  });
};

export const checkPromotionCode = data => {
  return apiService({
    url: '/orders/check-promotion-code',
    method: 'post',
    data
  });
};

export const getInfoBeforeCreateOrder = () => {
  return apiService({
    url: 'orders/get-info-before-create',
    method: 'get'
  });
};

export const getNumberDayFromOldOrder = params => {
  return apiService({
    url: 'orders/get-number-day-user-from-old-order',
    method: 'get',
    params
  });
};

export const actionFetchListColor = () => ({
  type: actionTypes.FETCH_LIST_COLOR_GROUP
});
