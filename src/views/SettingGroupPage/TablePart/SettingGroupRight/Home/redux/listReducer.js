import { createAction } from "@reduxjs/toolkit";
import { get } from "views/JobPage/utils";

export const listremove = createAction("remove");
export const listcreate = createAction("create");
export const listAddFirst = createAction("listAddFirst");

export const listReducer = (state = [], action) => {
  switch (action.type) {
    case listremove.type:
      return state.filter((item) => item.id !== action.payload);
    case listcreate.type:
      return [...state, action.payload];
    case listAddFirst.type:
      return [action.payload, ...state];
    default:
      return state;
  }
};

export const mapPayloadToState = (state, action) => {
  const subAction = get(action, "meta.action");
  if (subAction)
    return {
      ...state,
      [action.type]: listReducer(state[action.type], subAction),
    };
  return {
    ...state,
    [action.type]: action.payload,
  };
};
