import { apiService } from '../../constants/axiosInstance';

export const actionRegister = email => {
  const config = {
    url: '/register',
    method: 'post',
    data: {
      email
    }
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
