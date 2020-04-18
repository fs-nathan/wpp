import { createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { get } from "views/JobPage/utils";
import { createAsyncAction } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";
import { mapPayloadToState } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/listReducer";

const rootPath = "post";
export const types = {
  postList: `[${rootPath}]/list`,
};

const updatePostList = createAction(types.postList, function prepare(data) {
  return {
    payload: data.posts,
  };
});

export const loadGroupPermissionList = () => {
  return createAsyncAction({
    config: {
      url: "/posts/get-list",
    },
    success: updatePostList,
  });
};
export const postListSelector = (state) =>
  get(state, [rootPath, updatePostList.type], emptyArray);

export const postModule = {
  selectors: { postListSelector },
  actions: { loadGroupPermissionList },
  key: rootPath,
  reducer: createReducer(
    {
      [updatePostList.type]: [],
    },
    {
      [updatePostList.type]: mapPayloadToState,
    }
  ),
};
