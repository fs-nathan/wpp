import get from "lodash/get";
import {
  createAsyncAction,
  createSimpleAsyncReducer,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "webpush";

const initialListOfWeekNow = {
  state: true,
  key: {
    google_driver: {
      api_key: "AIzaSyC0iTTmOVJrNX4PXjD8C4ObSGOXCUwJchg",
      client_id:
        "923513358062-8s222ro5m2d9ruicuhvi98uq7h6gd7mr.apps.googleusercontent.com",
    },
    google_map_key: "AIzaSyDeZ2O_NB6rLnIdYjzgk4hsvpuEZS_NR-E",
    web_push_public_key:
      "BNB2Uqj_kswVbl1phH7XuR39mRereAvuZZRbRtt2J1S0t3ez9gRSACvMJ_DG716Xpwh1luGpUJdUdKhmiHHOpbE",
  },
};
const web_push_public_key_selector = (state) =>
  get(apiKeySelector(state), "key.web_push_public_key");
const {
  load: loadApiKey,
  selector: apiKeySelector,
  reducer: apiKeyReducer,
} = createSimpleAsyncReducer(
  // start_date: String format YYYY-MM-DD required
  // end_date: String format YYYY-MM-DD required
  (_blank, options) =>
    createAsyncAction({
      config: {
        url: "/get-api-key",
        method: "get",
      },
      ...options,
    }),
  rootPath,
  initialListOfWeekNow
);
//

export const apiKeyModule = {
  selectors: { apiKeySelector, web_push_public_key_selector },
  actions: { loadApiKey },
  key: rootPath,
  reducer: apiKeyReducer,
};
