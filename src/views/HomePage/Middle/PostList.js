import { Button } from "@material-ui/core";
import LoadingBox from "components/LoadingBox";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useIntersection } from "react-use";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import { get } from "views/JobPage/utils";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import Post from "../components/Post";
import { postModule } from "../redux/post";

// const sample = [
//   {
//     id: "5e7b1f6ccbfae96d5414fb47",
//     title: "Thông báo cả làng làm việc ở nhà",
//     content: "Thông báo đã có lương",
//     user_create_id: "5e5dc0dbabaa0b738ab8053d",
//     user_create_name: "Thành Nguyễn",
//     user_create_avatar:
//       "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//     files: [],
//     images: [],
//     position: "Phó TGĐ",
//     room: "Ban đầu não",
//     number_like: 0,
//     number_comment: 0,
//     comments: [],
//     time_label: "1 hours before",
//     last_like_user: null,
//     last_love_user: null,
//   },
//   {
//     id: "5e7b1f4525d9416d34a7f8a8",
//     title: "Thông báo cả làng làm việc ở nhà",
//     content: "Thông báo đã có lương",
//     user_create_id: "5e5dc0dbabaa0b738ab8053d",
//     user_create_name: "Thành Nguyễn",
//     user_create_avatar:
//       "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//     files: [],
//     images: [
//       {
//         id: "5e79ce6f8baaa24895dd27e5",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "46.82 KB",
//         type: "jpg",
//       },
//     ],
//     position: "Phó TGĐ",
//     room: "Ban đầu não",
//     number_like: 0,
//     number_comment: 0,
//     comments: [],
//     time_label: "1 hours before",
//     last_like_user: null,
//     last_love_user: null,
//   },
//   {
//     id: "5e7b1f183ed3a06d0cf11413",
//     title: "Thông báo cả làng làm việc ở nhà",
//     content: "Thông báo đã có lương",
//     user_create_id: "5e5dc0dbabaa0b738ab8053d",
//     user_create_name: "Thành Nguyễn",
//     user_create_avatar:
//       "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//     files: [],
//     images: [
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//     ],
//     position: "Phó TGĐ",
//     room: "Ban đầu não",
//     number_like: 0,
//     number_comment: 0,
//     comments: [],
//     time_label: "1 hours before",
//     last_like_user: null,
//     last_love_user: null,
//   },
//   {
//     id: "5e7b1f020af9556d00cd870a",
//     title: "Thông báo cả làng làm việc ở nhà",
//     content: "Thông báo đã có lương",
//     user_create_id: "5e5dc0dbabaa0b738ab8053d",
//     user_create_name: "Thành Nguyễn",
//     user_create_avatar:
//       "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//     files: [],
//     images: [
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//     ],
//     position: "Phó TGĐ",
//     room: "Ban đầu não",
//     number_like: 0,
//     number_comment: 0,
//     comments: [],
//     time_label: "1 hours before",
//     last_like_user: null,
//     last_love_user: null,
//   },
//   {
//     id: "5e7b1ea6c6b7136cb1051c6d",
//     title: "Thông báo cả làng làm việc ở nhà",
//     content: "Thông báo đã có lương",
//     user_create_id: "5e5dc0dbabaa0b738ab8053d",
//     user_create_name: "Thành Nguyễn",
//     user_create_avatar:
//       "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//     files: [],
//     images: [
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//     ],
//     position: "Phó TGĐ",
//     room: "Ban đầu não",
//     number_like: 0,
//     number_comment: 0,
//     comments: [],
//     time_label: "1 hours before",
//     last_like_user: null,
//     last_love_user: null,
//   },
//   {
//     id: "5e7b1ea1c6b7136cb1051c48",
//     title: "Thông báo cả làng làm việc ở nhà",
//     content: "Thông báo đã có lương",
//     user_create_id: "5e5dc0dbabaa0b738ab8053d",
//     user_create_name: "Thành Nguyễn",
//     user_create_avatar:
//       "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//     files: [],
//     images: [
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//     ],
//     position: "Phó TGĐ",
//     room: "Ban đầu não",
//     number_like: 0,
//     number_comment: 0,
//     comments: [],
//     time_label: "1 hours before",
//     last_like_user: null,
//     last_love_user: null,
//   },
//   {
//     id: "5e79ce6f8baaa24895dd27e4",
//     title: "Thông báo cả làng làm việc ở nhà",
//     content: "FIle ddaay nhe",
//     user_create_id: "5e5dc0dbabaa0b738ab8053d",
//     user_create_name: "Thành Nguyễn",
//     user_create_avatar:
//       "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//     files: [],
//     images: [
//       {
//         id: "5e79ce6f8baaa24895dd27e5",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "46.82 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//       {
//         id: "5e79ce6f8baaa24895dd27e6",
//         url: "https://appapi.workplus.vn/images_default/cover.png",
//         size: "43.99 KB",
//         type: "jpg",
//       },
//     ],
//     position: "Phó TGĐ",
//     room: "Ban đầu não",
//     number_like: 1,
//     number_comment: 2,
//     comments: [
//       {
//         content: "Chao ca nha ok",
//         user_create_name: "Khắc Điệp",
//         user_create_avatar:
//           "https://storage.googleapis.com/storage_vtask_net/1584162011913-filename",
//         images: [],
//         files: [],
//         sticker: null,
//       },
//       {
//         content: "Chao ca nha ok 1",
//         user_create_name: "Khắc Điệp",
//         user_create_avatar:
//           "https://storage.googleapis.com/storage_vtask_net/1584162011913-filename",
//         images: [
//           {
//             id: "5e7a2315411aeb5b50c0d1ea",
//             url: "/storage_vtask_net/1585062675839-anh_ghep_01.jpg",
//             size: "46.82 KB",
//             type: "jpg",
//           },
//         ],
//         files: [
//           {
//             id: "5e7a2315411aeb5b50c0d1e9",
//             url: "/storage_vtask_net/1585062674614-abc.csv",
//             size: "325 B",
//             type: "csv",
//           },
//         ],
//         sticker: null,
//       },
//     ],
//     time_label: "1 days before",
//     last_like_user: {
//       name: "Thành Nguyễn",
//       avatar:
//         "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
//     },
//     last_love_user: {
//       name: "Khắc Điệp",
//       avatar:
//         "https://storage.googleapis.com/storage_vtask_net/1584162011913-filename",
//     },
//   },
// ];

function PostList({ postList }) {
  return (
    <>
      {postList.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </>
  );
}
let count = 0;
// window.redux = {
//   store: store,
//   postModule,
//   createPost: () =>
//     store.dispatch(
//       postModule.actions.createPost({
//         title: `post ${count}`,
//         content: `content ${count++}`,
//         is_push_notification: true,
//         category: "12321321",
//       })
//     ),
// };
const paging = (data) => {
  const currentPage = get(data, "paging.page");
  const totalPage = get(data, "paging.total_page");
  const hasMore = currentPage && totalPage && currentPage < totalPage;
  return { currentPage, totalPage, hasMore };
};

const MorePosts = ({ page }) => {
  const intersectionRef = React.useRef(null);
  const intersection = useIntersection(intersectionRef, {
    root: null,
    rootMargin: "250px",
    threshold: 1,
  });
  const [{ asyncId, status, data }, dispathAsync] = useAsyncTracker();
  useEffect(() => {
    !asyncId &&
      intersection &&
      intersection.intersectionRatio > 0 &&
      dispathAsync(postModule.actions.loadMorePostList({ page }));
  }, [asyncId, dispathAsync, intersection, page]);
  console.log(data);

  if (status !== apiCallStatus.success)
    return (
      <>
        <div ref={intersectionRef} />
        <LoadingBox />
      </>
    );
  const { currentPage, totalPage, hasMore } = paging(data);
  return (
    <>
      <PostList postList={[...data.posts]} />
      {hasMore && <MorePosts page={currentPage + 1} />}
      {!hasMore && <Button style={{ display: "block" }}>Hết rồi</Button>}
    </>
  );
};
export default () => {
  const [{ asyncId, status, data }, dispathAsync] = useAsyncTracker();
  useEffect(() => {
    dispathAsync(postModule.actions.loadPostList());
  }, [dispathAsync]);
  const postList = useSelector(postModule.selectors.postListSelector);
  const { currentPage, totalPage, hasMore } = paging(data);
  return (
    <>
      <PostList postList={postList} />
      {status === apiCallStatus.success && postList.length === 0 && (
        <EmptyHolder title={"Chưa có bài post nào được tạo"} description={""} />
      )}
      {hasMore && <MorePosts page={currentPage + 1} />}
      {!hasMore && <Button style={{ display: "block" }}>Hết rồi</Button>}
    </>
  );
};
