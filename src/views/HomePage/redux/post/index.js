import { combineReducers, createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { get, merge, toFormData } from "views/JobPage/utils";
import {
  createAsyncAction,
  createPostAsyncAction,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "posts";
export const types = {
  homepage: `homepage`,
  highLight: `highLight`,
  statistic: "statistic",
};
const createListModule = (rootPath) => {
  const listremove = createAction(rootPath + "__listremove");
  const listupdate = createAction(rootPath + "__listupdate");
  const listcreate = createAction(rootPath + "__listcreate");
  const listAddFirst = createAction(rootPath + "__listAddFirst");
  return {
    actions: { listremove, listupdate, listcreate, listAddFirst },
    reducer: createReducer([], {
      [listremove.type]: (state, action) =>
        state.filter((item) => item.id !== action.payload),
      [listupdate.type]: (state, action) =>
        state.map((item) => {
          if (item.id !== action.payload.id) return item;
          return merge({}, item, action.payload);
        }),
      [listcreate.type]: (state, action) => action.payload,
      [listAddFirst.type]: (state, action) => [action.payload, ...state],
    }),
  };
};
const post = createListModule(types.homepage);

export const loadPostList = () => {
  return createAsyncAction({
    config: {
      url: "/posts/get-list",
    },
    success: createAction(post.actions.listcreate.type, function prepare(data) {
      return {
        payload: data.posts,
      };
    }),
  });
};
export const loadMorePostList = ({ page } = {}) => {
  return createAsyncAction({
    config: {
      url: `/posts/get-list?page=${page}`,
    },
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
      data: toFormData({
        title,
        category,
        content,
        file,
        sticker,
        is_push_notification,
      }),
    },
    success: createAction(post.actions.listAddFirst.type, function prepare(
      data
    ) {
      return {
        payload: data.post,
      };
    }),
  });
};

const deletePost = ({ post_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/delete-post",
      data: { post_id },
    },
    success: createAction(post.actions.listremove.type, function prepare(data) {
      return {
        payload: post_id,
      };
    }),
  });
};
// Make post highlight
// post
// /posts/make-post-highlight
// post_id: String required
// {
//     "state": true,
//     "post": {
//         "id": "5e7b2e9bf1e7e4730a61fb74",
//         "title": "Thông báo cả làng làm việc ở nhà",
//         "user_create_avatar": "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//         "user_create_name": "Thành Nguyễn",
//         "category_name": "Sự kiện",
//         "created_at": "17:12 25/03/2020"
//     }
// }
const makePostHighLight = ({ post_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/make-post-highlight",
      data: { post_id },
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: {
          id: post_id,
          is_highlight: true,
        },
      };
    }),
  });
};

// Cancel post highlight
// /posts/cancel-post-highlight
// post
// post_id: String required
// {
//     "state": true,
//     "post_id": "5e7b2e9bf1e7e4730a61fb74"
// }
const cancelPostHighLight = ({ post_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/cancel-post-highlight",
      data: { post_id },
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: {
          id: post_id,
          is_highlight: false,
        },
      };
    }),
  });
};

// pim
const pinPost = ({ post_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/pin-post",
      data: { post_id },
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: {
          id: post_id,
          is_pin: true,
        },
      };
    }),
  });
};
const cancelPinPost = ({ post_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/cancel-pin-post",
      data: { post_id },
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: {
          id: post_id,
          is_pin: false,
        },
      };
    }),
  });
};

// like
// RES :
// {
//   "state": true,
//   "number_like": 2,
//   "is_like": true,
//   "number_love": 0,
//   "is_love": false,
//   "post_id": "5e79ce6f8baaa24895dd27e4"
// }
const like = ({ post_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/like-post",
      data: { post_id },
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: {
          id: post_id,
          is_like: true,
          number_like: data.number_like,
          number_love: data.number_love,
        },
      };
    }),
  });
};

const love = ({ post_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/love-post",
      data: { post_id },
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: {
          id: post_id,
          is_love: true,
          number_like: data.number_like,
          number_love: data.number_love,
        },
      };
    }),
  });
};

// post_id: String required
// content: String optional
// file: Array file optional
// sticker: String optional
// parent_id: String optional
const comment = ({ post_id, content, file, sticker, parent_id }) => {
  return createPostAsyncAction({
    config: {
      url: "/posts/create-comment",
      data: toFormData({ post_id, content, file, sticker, parent_id }),
    },
    // success: createAction(updatePostList.type, function prepare(data) {
    //   return {
    //     payload: data,
    //     meta: {
    //       action: listupdate({
    //         id: post_id,
    //         is_love: true,
    //         number_like: data.number_like,
    //         number_love: data.number_love,
    //       }),
    //     },
    //   };
    // }),
  });
};

const highLightPostList = createListModule(types.highLight);

// /posts/get-post-highlight
const loadPostHighLightList = () => {
  return createAsyncAction({
    config: {
      url: "/posts/get-post-highlight",
    },
    success: createAction(
      highLightPostList.actions.listcreate.type,
      function prepare(data) {
        return {
          payload: data.posts,
        };
      }
    ),
  });
};

// /posts/get-post-highlight
const loadPostStatistic = () => {
  return createAsyncAction({
    config: {
      url: "/posts/get-statistic",
    },
    success: createAction("statistic", function prepare(data) {
      return {
        payload: data.data,
      };
    }),
  });
};

export const postListSelector = (state) =>
  get(state, [rootPath, types.homepage], emptyArray);
export const highLightPostListSelector = (state) =>
  get(state, [rootPath, types.highLight], emptyArray);
export const homeStatisticSelector = (state) =>
  get(state, [rootPath, types.statistic], emptyArray);

export const postModule = {
  selectors: {
    postListSelector,
    highLightPostListSelector,
    homeStatisticSelector,
  },
  actions: {
    loadPostList,
    loadPostHighLightList,
    loadPostStatistic,
    createPost,
    loadMorePostList,
    makePostHighLight,
    cancelPostHighLight,
    pinPost,
    cancelPinPost,
    deletePost,
    like,
    love,
    comment,
  },
  key: rootPath,
  reducer: combineReducers({
    [types.homepage]: post.reducer,
    [types.highLight]: highLightPostList.reducer,
    [types.statistic]: createReducer([], {
      statistic: (state, action) => {
        return action.payload;
      },
    }),
  }),
};
