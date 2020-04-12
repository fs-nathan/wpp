import { createAction } from "@reduxjs/toolkit";
import { get, loginlineFunc, merge } from "views/JobPage/utils";

export const listremove = createAction("listremove");
export const listupdate = createAction("listupdate");
export const listcreate = createAction("listcreate");
export const listAddFirst = createAction("listAddFirst");

export const listReducer = (state = [], action) => {
  switch (action.type) {
    case listremove.type:
      return state.filter((item) => item.id !== action.payload);
    case listcreate.type:
      return [...state, action.payload];
    case listAddFirst.type:
      return [action.payload, ...state];
    case listupdate.type:
      return state.map((item) => {
        if (
          loginlineFunc((id, action) => {
            return item.id !== action.payload.id;
          })(item, action)
        )
          return item;
        return merge({}, item, action.payload);
      });
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
