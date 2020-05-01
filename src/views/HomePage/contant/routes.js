import Main from "../Middle/views/Main";
import PostDetail from "../Middle/views/PostDetail";
import Search from "../Middle/views/Search";

export const routes = {
  home: {
    path: "/home",
    component: Main,
  },
  postDetail: {
    path: "/home/post/:id",
    component: PostDetail,
  },
  search: {
    path: "/home/search",
    component: Search,
  },
};
