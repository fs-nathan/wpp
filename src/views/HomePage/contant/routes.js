import Main from "../Middle/views/Main";
import PostDetail from "../Middle/views/PostDetail";
import Search from "../Middle/views/Search";

export const routes = {
  home: {
    path: "/",
    component: Main,
  },
  postDetail: {
    path: "?path=post&&post_id=:id",
    component: PostDetail,
  },
  search: {
    path: "?path=search",
    component: Search,
  },
};
