import { createAction, createReducer } from "@reduxjs/toolkit";
import get from "lodash/get";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import { merge } from "views/JobPage/utils";
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
      data: data,
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
export const createListModule = (rootPath) => {
  const listremove = createAction(rootPath + "__listremove");
  const listupdate = createAction(rootPath + "__listupdate");
  const listcreate = createAction(rootPath + "__listcreate");
  const listAddFirst = createAction(rootPath + "__listAddFirst");
  return {
    actions: { listremove, listupdate, listcreate, listAddFirst },
    reducer: createReducer([], {
      [listremove.type]: (state, action) =>
        state.filter((item) => item.id !== action.payload),
      [listupdate.type]: (state, action) => {
        let exited = false;
        const newState = state.map((item) => {
          if (item.id !== action.payload.id) return item;
          exited = true;
          let newImages = action.payload.images ? action.payload.images : item.images ? item.images : []
          let newFiles = action.payload.files ? action.payload.files : item.files ? item.files : []
          return merge({}, {...item, images: newImages, files: newFiles}, action.payload);
        });
        if (exited) {
          return newState;
        }
        return [action.payload, ...newState];
      },
      [listcreate.type]: (state, action) => action.payload,
      [listAddFirst.type]: (state, action) => [action.payload, ...state],
    }),
  };
};
export const createSimpleAsyncReducer = (
  actionCreator,
  type,
  initial = emptyObject
) => {
  const load = (requiredFields) => {
    return actionCreator(requiredFields, {
      success: createAction(type),
    });
  };
  const selector = (state) => get(state, type, initial);
  const reducer = createReducer(initial, {
    [type]: (state, action) => action.payload,
  });
  return {
    load,
    selector,
    reducer,
  };
};
