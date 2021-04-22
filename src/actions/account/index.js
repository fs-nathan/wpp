import { apiService } from '../../constants/axiosInstance';
import * as actionTypes from '../../constants/actions/system/system';

export const actionRegister = data => {
  const config = {
    url: '/register',
    method: 'post',
    data
  };
  return apiService(config);
};

export const actionForgotPassword = email => {
  const config = {
    url: '/forget-password',
    method: 'post',
    data: {
      email
    }
  };
  return apiService(config);
};

export const actionResetPassword = (token, password) => {
  const config = {
    url: '/reset-password',
    method: 'post',
    data: {
      token,
      password
    }
  };
  return apiService(config);
};

export const actionCompleteRegister = data => {
  const config = {
    url: '/complete-register',
    method: 'post',
    data: data
  };
  return apiService(config);
};

export const actionCheckCode = code => {
  const config = {
    url: '/get-email-register',
    method: 'get',
    params: {
      code
    }
  };
  return apiService(config);
};

export const actionChangePassword = data => {
  const config = {
    url: '/change-password',
    method: 'post',
    data
  };
  return apiService(config);
};

export const getNotificationStatusService = () => {
  const config = {
    url: '/notification-system/status-new-notification',
    method: 'get'
  };
  return apiService(config);
};
export const getNotificationService = () => {
  const config = {
    url: '/notification-system/list',
    method: 'get'
  };
  return apiService(config);
};
export const getNotificationStatus = () => {
  const config = {
    url: '/notification-system/status-new-notification',
    method: 'get'
  };
  return apiService(config);
};
export const actionGetNotification = data => {
  return {
    type: actionTypes.GET_NOTIFICATION,
    payload: data
  };
};
export const getNotificationDetailService = notification_id => {
  const config = {
    url: '/notification-system/detail',
    method: 'get',
    params: { notification_id }
  };
  return apiService(config);
};
export const actionUpdateProfile = data => {
  const config = {
    url: '/update-profile',
    method: 'post',
    data
  };
  return apiService(config);
};
export const actionUpdateAvatar = data => {
  const config = {
    url: '/update-avatar',
    method: 'post',
    data
  };
  return apiService(config);
};
