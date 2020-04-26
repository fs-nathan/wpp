import Main from "../Middle/views/Main";
import PostDetail from "../Middle/views/PostDetail";

export const routes = {
  home: {
    path: "/",
    component: Main,
  },
  postDetail: {
    path: "/post/:id",
    component: PostDetail,
  },
};
