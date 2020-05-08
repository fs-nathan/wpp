import { createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { get } from "views/JobPage/utils";
import { createAsyncAction, createPostAsyncAction } from "./apiCall/utils";
import { listcreate, listremove, mapPayloadToState } from "./listReducer";
const rootPath = "/setting-group/home";

export const types = {
  categoryListUpdated: `[${rootPath}]/post-category/list`,
  categoryLogoListUpdated: `[${rootPath}]/post-category/list-logo`,
};

const updateCategoryList = createAction(
  types.categoryListUpdated,
  function prepare(data) {
    return {
      payload: data.categories,
    };
  }
);
const deleteCategoryList = createAction(
  types.categoryListUpdated,
  function prepare(data) {
    return {
      payload: data.id,
      meta: {
        action: listremove(data.id),
      },
    };
  }
);
const addCategoryList = createAction(
  types.categoryListUpdated,
  function prepare(data) {
    return {
      payload: data.data,
      meta: {
        action: listcreate(data.data),
      },
    };
  }
);

export const createPostCategory = ({ name, logo }) => {
  return createPostAsyncAction({
    config: {
      url: "/post-category/create",
      method: "post",
      data: { name, logo },
    },
    success: addCategoryList,
  });
};
export const deletePostCategory = ({ category_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/post-category/delete",
      method: "delete",
      data: { category_id },
    },
    success: deleteCategoryList,
  });
};
export const loadCategoryList = () => {
  return createAsyncAction({
    config: {
      url: "/post-category/list",
    },
    success: updateCategoryList,
  });
};

export const settingGroupHome = {
  key: "settingGroupHome",
  reducer: createReducer(
    {
      [types.categoryListUpdated]: [],
    },
    {
      [updateCategoryList]: mapPayloadToState,
    }
  ),
};

export const categoryListSelector = (state) =>
  get(state, [settingGroupHome.key, types.categoryListUpdated], emptyArray);
