import { combineReducers, createAction, createReducer } from "@reduxjs/toolkit";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { encodeQueryData, get, toFormData } from "views/JobPage/utils";
import {
  createAsyncAction,
  createListModule,
  createPostAsyncAction,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/utils";

const rootPath = "home";
export const types = {
  homepage: `home_postList`,
  highLight: `home_highLight`,
  statistic: "home_statistic",
};
const post = createListModule(types.homepage);
export const loadPostList = ({ title, category_id } = {}) => {
  return createAsyncAction({
    config: {
      url: `/posts/get-list?${encodeQueryData({
        search_data: title,
        category_id,
      })}`,
    },
    success: createAction(post.actions.listcreate.type, function prepare(data) {
      return {
        payload: data.posts,
      };
    }),
  });
};
// post_id: String required
export const loadPostById = ({ post_id }) => {
  return createAsyncAction({
    config: {
      url: "/posts/get-detail?post_id=" + post_id,
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: data.post,
      };
    }),
  });
};
export const loadMorePostList = ({ title, category_id, page } = {}) => {
  return createAsyncAction({
    config: {
      url: `/posts/get-list?${encodeQueryData({
        search_data: title,
        category_id,
        page,
      })}`,
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
    notifyOnSuccess: false,
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
    notifyOnSuccess: false,
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
    notifyOnSuccess: false,
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
    notifyOnSuccess: false,
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
    notifyOnSuccess: false,
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
    notifyOnSuccess: false,
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
    notifyOnSuccess: false,
    config: {
      url: "/posts/like-post",
      data: { post_id },
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: {
          id: post_id,
          is_like: data.is_like,
          is_love: data.is_love,
          number_like: data.number_like,
          number_love: data.number_love,
        },
      };
    }),
  });
};

const love = ({ post_id }) => {
  return createPostAsyncAction({
    notifyOnSuccess: false,
    config: {
      url: "/posts/love-post",
      data: { post_id },
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: {
          id: post_id,
          is_like: data.is_like,
          is_love: data.is_love,
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
    notifyOnSuccess: false,
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
// post_id: String required
export const loadCommentListByPost = ({ post_id }) => {
  return createAsyncAction({
    config: {
      url: `/posts/get-comment?post_id=${post_id}`,
    },
  });
};
export const loadMoreCommentList = ({ page, post_id } = {}) => {
  return createAsyncAction({
    config: {
      url: `/posts/get-comment?post_id=${post_id}&&page=${page}`,
    },
  });
};

// /posts/get-reply-comment
// post_id: String required
// comment_id: String required
export const loadReplyList = ({ post_id, comment_id }) => {
  return createAsyncAction({
    config: {
      url: `/posts/get-reply-comment?${encodeQueryData({
        post_id,
        comment_id,
      })}`,
    },
  });
};
export const loadMoreReplyList = ({ post_id, comment_id, page } = {}) => {
  return createAsyncAction({
    config: {
      url: `/posts/get-reply-comment?${encodeQueryData({
        post_id,
        comment_id,
        page,
      })}`,
    },
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
    loadCommentListByPost,
    loadMoreCommentList,
    loadPostList,
    loadMorePostList,
    loadPostById,
    loadPostHighLightList,
    loadPostStatistic,
    loadReplyList,
    loadMoreReplyList,
    createPost,
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
