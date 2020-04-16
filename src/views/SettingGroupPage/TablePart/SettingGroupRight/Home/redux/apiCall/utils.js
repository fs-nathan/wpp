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
      data,
    },
    data,
    asyncId,
    success,
    failure,
    notifyOnFailure,
    notifyOnSuccess,
  });
};
