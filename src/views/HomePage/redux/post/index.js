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
// file_ids: Array optional
// google_data: Array object optional. Description object below
// {
// file_id: String required
// name: String required
// size: Number required
// url: String required
// url_download: String required
// file_type: String required
// }

const createPost = ({
  title,
  category,
  content,
  file,
  file_ids,
  google_data,
  file_order,
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
        file_ids,
        google_data,
        file_order,
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

const updatePost = ({
  id,
  title,
  category,
  content,
  file,
  file_ids,
  google_data,
  sticker,
  file_order,
  is_push_notification = true,
}) => {
  return createPostAsyncAction({
    notifyOnSuccess: false,
    config: {
      url: "/posts/update-post",
      data: toFormData({
        post_id: id,
        title,
        category,
        content,
        file,
        sticker,
        file_ids,
        google_data,
        is_push_notification,
        file_order,
      }),
    },
    success: createAction(post.actions.listupdate.type, function prepare(data) {
      return {
        payload: data.post,
      };
    }),
  });
};

const deletePost = ({ post_id, asyncId }) => {
  return createPostAsyncAction({
    asyncId,
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
const like = ({ post_id, profile }) => {
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
          ...data.post_data,
        },
      };
    }),
  });
};

const love = ({ post_id, profile }) => {
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
          ...data.post_data,
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
// file_ids: Array optional
// google_data: Array object optional. Description object below
// {
// file_id: String required
// name: String required
// size: Number required
// url: String required
// url_download: String required
// file_type: String required
// }
const comment = ({
  post_id,
  content,
  file,
  file_ids,
  google_data,
  sticker,
  parent_id,
}) => {
  console.log(file_ids)
  return createPostAsyncAction({
    notifyOnSuccess: false,
    config: {
      url: "/posts/create-comment",
      data: toFormData({
        post_id,
        content,
        file,
        sticker,
        parent_id,
        file_ids,
        google_data,
      }),
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

const deleteComment = ({ comment_id }) => {
  return createPostAsyncAction({
    notifyOnSuccess: false,
    config: {
      url: "/posts/delete-comment",
      data: { comment_id },
    },
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
  postListSelector(state).filter((item) => item.is_highlight);
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
    updatePost,
    makePostHighLight,
    cancelPostHighLight,
    pinPost,
    cancelPinPost,
    deletePost,
    like,
    love,
    comment,
    deleteComment,
    updatePostListItem: createAction(post.actions.listupdate.type),
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
