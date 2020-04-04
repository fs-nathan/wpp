import { createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { get, loginlineFunc, loginlineParams } from "views/JobPage/utils";
import { createAsyncAction } from "./apiCall/utils";
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
const updateCategoryList = createAction(
  types.categoryListUpdated,
  function prepare(data) {
    return {
      payload: data.categories
    };
  }
);
const deleteCategoryList = createAction(
  types.categoryListUpdated,
  function prepare(data) {
    return {
      payload: data.id,
      meta: {
        action: listremove(data.id)
      }
    };
  }
);
const addCategoryList = createAction(
  types.categoryListUpdated,
  function prepare(data) {
    return {
      payload: data.data,
      meta: {
        action: listcreate(data.data)
      }
    };
  }
);
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
    success: addCategoryList
  });
};
export const deletePostCategory = ({ category_id }) => {
  return createAsyncAction({
    config: {
      url: "/post-category/delete",
      method: "delete",
      data: { category_id }
    },
    success: deleteCategoryList
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
const listremove = createAction("remove");
const listcreate = createAction("create");

const listReducer = (state = [], action) => {
  loginlineParams({ state, action, listremove });
  switch (action.type) {
    case listremove.type:
      return state.filter(item => item.id !== action.payload);
    case listcreate.type:
      return [...state, action.payload];
    default:
      return state;
  }
};
const mapPayloadToState = (state, action) => {
  const subAction = loginlineFunc(get)(action, "meta.action");
  console.log({ state: state[action.type] });
  if (subAction)
    return {
      ...state,
      [action.type]: loginlineFunc(listReducer)(state[action.type], subAction)
    };
  return {
    ...state,
    [action.type]: action.payload
  };
};

export const settingGroupHome = {
  key: "settingGroupHome",
  reducer: createReducer(
    {
      [types.categoryListUpdated]: []
    },
    {
      [updateCategoryList]: mapPayloadToState,
      [updateCategoryLogoList]: mapPayloadToState
    }
  )
};

export const categoryListSelector = state =>
  get(state, [settingGroupHome.key, types.categoryListUpdated], emptyArray);
