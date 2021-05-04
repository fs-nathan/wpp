import axios from "axios";
import { GROUP_ACTIVE, REFRESH_TOKEN, TOKEN } from "constants/constants";
import { openNoticeModal } from "../actions/system/system";
import store from "../configStore";
import config from "./apiConstant";

const apiService = axios.create({
  baseURL: config.BASE_API,
  config: {
    crossDomain: true,
    headers: {
      "Content-Type": "application/json",
    },
  },
});

apiService.interceptors.request.use(function (config) {
  const accessToken = localStorage.getItem("token");
  const group_active = localStorage.getItem("group-active");
  config.headers["Authorization"] = `Bearer ${accessToken}`;
  config.headers["group-active"] = group_active;
  return config;
});

apiService.interceptors.response.use(
  function (res) {
    if (res.data.state === false) {
      if (
        res.data.error_code === "ORDER_EXPIRED" ||
        res.data.error_code === "ACCOUNT_FREE" ||
        res.data.error_code === "ACCOUNT_LOCKED"
      ) {
        store.dispatch(openNoticeModal(res.data.error_code));
        return Promise.reject(new Error("__NO_SNACKBAR_ERROR__"));
      } else {
        return Promise.reject(new Error(res.data.msg));
      }
    }

    return res;
  },
  function (error) {
    if (error.response && (error.response.status === 403 || error.response.status === 401)) {
      localStorage.removeItem(TOKEN);
      localStorage.removeItem(REFRESH_TOKEN);
      localStorage.removeItem(GROUP_ACTIVE);
      window.location.href = `/login`;
      return error.response;
    }
    return Promise.reject(error);
  }
);

export { apiService };

