import { createAction } from "@reduxjs/toolkit";
import { get } from "views/JobPage/utils";

export const listremove = createAction("remove");
export const listcreate = createAction("create");

export const listReducer = (state = [], action) => {
  switch (action.type) {
    case listremove.type:
      return state.filter(item => item.id !== action.payload);
    case listcreate.type:
      return [...state, action.payload];
    default:
      return state;
  }
};

export const mapPayloadToState = (state, action) => {
  const subAction = get(action, "meta.action");
  console.log({ state: state[action.type] });
  if (subAction)
    return {
      ...state,
      [action.type]: listReducer(state[action.type], subAction)
    };
  return {
    ...state,
    [action.type]: action.payload
  };
};
