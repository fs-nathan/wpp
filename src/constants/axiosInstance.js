import axios from "axios";
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
  config.headers["task_id"] = "5da1821ad219830d90402fd8"; // Fixed task id in header (it should be pass from saga)
  return config;
});

apiService.interceptors.response.use(
  function (res) {
    if (res.data.state === false) {
      if (
        res.data.error_code === "ORDER_EXPIRED" ||
        res.data.error_code === "ACCOUNT_FREE"
      ) {
        store.dispatch(openNoticeModal());
        return Promise.reject(new Error("__NO_SNACKBAR_ERROR__"));
      } else {
        return Promise.reject(new Error(res.data.msg));
      }
    }

    return res;
  }
  // function (error) {
  //   if (error.response.status === 403) {
  //     localStorage.removeItem(TOKEN);
  //     localStorage.removeItem(REFRESH_TOKEN);
  //     localStorage.removeItem(GROUP_ACTIVE);
  //     window.location.href = Routes.LOGIN;
  //     return error.response;
  //   }
  //   // return Promise.reject(error);
  // }
);

export { apiService };
