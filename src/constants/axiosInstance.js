import axios from 'axios';
import config from './apiConstant';
// import { Routes } from './routes';
// import { TOKEN, REFRESH_TOKEN, GROUP_ACTIVE, WP_LANGUAGE } from './constants';
import { WP_LANGUAGE } from './constants';

const apiService = axios.create({
  baseURL: config.BASE_API,
  config: {
    crossDomain: true,
    headers: {
      'Content-Type': 'application/json'
    }
  }
});

apiService.interceptors.request.use(function(config) {
  const accessToken = localStorage.getItem('token');
  const group_active = localStorage.getItem('group-active');
  config.headers['Authorization'] = `Bearer ${accessToken}`;
  config.headers['group-active'] = group_active;
  config.headers['language'] = localStorage.getItem(WP_LANGUAGE) || 'vi';
  config.headers['task_id'] = '5da1821ad219830d90402fd8'; // Fixed task id in header (it should be pass from saga)
  return config;
});

apiService.interceptors.response.use(
  function(res) {
    if (res.data.state === false)
      return Promise.reject(new Error(res.data.msg));
    return res;
  },
  function(error) {
    if (error.response.status === 403) {
      apiService
        .post('login', {
          email: 'huuthanhxd@gmail.com',
          password: '12345678'
        })
        .then(response => {
          localStorage.setItem('token', response.data.accessToken);
          localStorage.setItem('refreshToken', response.data.refreshToken);
          localStorage.setItem('group-active', response.data.group_active);
          apiService.defaults.headers.common[
            'Authorization'
          ] = `Bearer ${response.data.accessToken}`;
          apiService.defaults.headers.common['group-active'] =
            response.data.group_active;
        });
      return error.response;
    }
    return Promise.reject(error);
  }
);

export { apiService };
