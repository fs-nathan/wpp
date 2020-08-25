import { createAction } from "@reduxjs/toolkit";
import { API_CALL, API_CALL_FAILURE, API_CALL_SUCCESS } from "./types";

export const apiCallRequest = createAction(API_CALL);
export const apiCallSuccess = createAction(API_CALL_SUCCESS);
export const apiCallFailure = createAction(API_CALL_FAILURE);
