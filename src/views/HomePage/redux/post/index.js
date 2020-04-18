import { createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { get } from "views/JobPage/utils";
import {
  createAsyncAction,
  createPostAsyncAction,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";
import {
  listAddFirst,
  mapPayloadToState,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/listReducer";

const rootPath = "post";
export const types = {
  postList: `[${rootPath}]/list`,
};

const updatePostList = createAction(types.postList, function prepare(data) {
  return {
    payload: data.posts,
  };
});

export const loadPostList = () => {
  return createAsyncAction({
    config: {
      url: "/posts/get-list",
    },
    success: updatePostList,
  });
};

// title: String required
// category: String required
// content: String optional
// file: Array file optional
// sticker: String optional
// is_push_notification: Boolean required
const createPost = ({
  title,
  category,
  content,
  file,
  sticker,
  is_push_notification = true,
}) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/create-post",
      data: { title, category, content, file, sticker, is_push_notification },
    },
    success: createAction(updatePostList.type, function prepare(data) {
      return {
        payload: data.post,
        meta: {
          action: listAddFirst(data.post),
        },
      };
    }),
  });
};
export const postListSelector = (state) =>
  get(state, [rootPath, updatePostList.type], emptyArray);

export const postModule = {
  selectors: { postListSelector },
  actions: { loadPostList, createPost },
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
