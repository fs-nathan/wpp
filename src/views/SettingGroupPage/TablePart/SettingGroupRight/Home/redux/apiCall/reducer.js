import { createReducer } from "@reduxjs/toolkit";
import { apiCallFailure, apiCallRequest, apiCallSuccess } from "./actions";
import { apiCallStatus } from "./types";

const apiCall = createReducer(
  {},
  {
    [apiCallRequest]: (state, action) =>
      action.payload.asyncId
        ? {
            ...state,
            [action.payload.asyncId]: { status: apiCallStatus.loading },
          }
        : state,
    [apiCallSuccess]: (state, action) => {
      const { asyncId, data } = action.payload;
      return action.payload.asyncId
        ? {
            ...state,
            [asyncId]: { status: apiCallStatus.success, data },
          }
        : state;
    },
    [apiCallFailure]: (state, action) =>
      action.payload.asyncId
        ? {
            ...state,
            [action.payload.asyncId]: { status: apiCallStatus.failure },
          }
        : state,
  }
);
export default apiCall;
