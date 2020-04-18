import { toFormData } from "views/JobPage/utils";
import { apiCallRequest } from "./actions";

export const createAsyncAction = ({
  config: { url, method = "get", data },
  asyncId,
  success,
  failure,
  notifyOnFailure,
  notifyOnSuccess,
}) => {
  return apiCallRequest({
    config: {
      url,
      method,
      data: toFormData(data),
    },
    data,
    asyncId,
    success,
    failure,
    notifyOnFailure,
    notifyOnSuccess,
  });
};

export const createPostAsyncAction = ({
  config: { url, method = "post", data },
  asyncId,
  success,
  failure,
  notifyOnFailure = true,
  notifyOnSuccess = true,
}) => {
  return apiCallRequest({
    config: {
      url,
      method,
      data: toFormData(data),
    },
    data,
    asyncId,
    success,
    failure,
    notifyOnFailure,
    notifyOnSuccess,
  });
};
