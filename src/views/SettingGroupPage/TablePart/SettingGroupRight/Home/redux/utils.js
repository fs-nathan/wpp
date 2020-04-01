import { API_CALL } from "./saga";

export const createAsyncAction = ({
  config: { url, method = "get" },
  data,
  success,
  failure
}) => {
  return {
    type: API_CALL,
    payload: {
      config: {
        url,
        method
      },
      data,
      success,
      failure
    }
  };
};
