import { createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { get } from "views/JobPage/utils";
import { createAsyncAction } from "./utils";
const rootPath = "/setting-group/home";
export const types = {
  categoryListUpdated: `[${rootPath}]/post-category/list`,
  categoryLogoListUpdated: `[${rootPath}]/post-category/list-logo`
};
function prepare(data) {
  return {
    payload: data
  };
}
const updateCategoryList = createAction(types.categoryListUpdated, prepare);
const updateCategoryLogoList = createAction(
  types.categoryLogoListUpdated,
  prepare
);
export const loadPostCategoryLogoList = () => {
  return createAsyncAction({
    config: {
      url: "/list-icon"
    },
    success: updateCategoryLogoList
  });
};
export const createPostCategory = ({ name, logo }) => {
  return createAsyncAction({
    config: {
      url: "/post-category/create",
      method: "post",
      data: { name, logo }
    },

    success: updateCategoryLogoList
  });
};
export const loadCategoryList = () => {
  return createAsyncAction({
    config: {
      url: "/post-category/list"
    },
    success: updateCategoryList
  });
};
const mapPayloadToState = (state, action) => ({
  ...state,
  [action.type]: action.payload
});

export const settingGroupHome = {
  key: "settingGroupHome",
  reducer: createReducer(
    {
      [types.categoryListUpdated]: {}
    },
    {
      [updateCategoryList]: mapPayloadToState,
      [updateCategoryLogoList]: mapPayloadToState
    }
  )
};

export const categoryListSelector = state =>
  get(
    state,
    [settingGroupHome.key, types.categoryListUpdated, "categories"],
    emptyArray
  );
