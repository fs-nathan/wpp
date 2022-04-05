import { Box, Button, Typography } from "@material-ui/core";
import LoadingBox from "components/LoadingBox";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { shallowEqual, useSelector } from "react-redux";
import { useIntersection } from "react-use";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import { get } from "views/JobPage/utils";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import nodataimg from "../components/ic_no_data.png";
import Post from "../components/Post";
import { postModule } from "../redux/post";
import TasksCard from "../components/TasksCard";
import "./PostList.scss";
function PostList({ postList }) {
  return (
    <>
      {postList.map((post, i) => (
        <Post key={i} post={post} />
      ))}
    </>
  );
}

export const paging = (data) => {
  const currentPage = get(data, "paging.page");
  const totalPage = get(data, "paging.total_page");
  const hasMore = currentPage && totalPage && currentPage < totalPage;
  return { currentPage, totalPage, hasMore };
};

const MorePosts = ({ page, onLoadMore }) => {
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
      onLoadMore(page);
  }, [asyncId, dispathAsync, intersection, onLoadMore, page]);
  if (status !== apiCallStatus.success)
    return (
      <>
        <div ref={intersectionRef} />
        <LoadingBox />
      </>
    );
  const { currentPage, hasMore } = paging(data);
  return (
    <>
      <PostList postList={[...data.posts]} />
      {hasMore && <MorePosts page={currentPage + 1} onLoadMore={onLoadMore} />}
      {status === apiCallStatus.success && !hasMore && (
        <Button style={{ display: "block" }}>Hết rồi</Button>
      )}
    </>
  );
};
export default React.memo(({ category_id, title }) => {
  const { t } = useTranslation();
  const [{ asyncId, status, data }, dispathAsync] = useAsyncTracker();
  useEffect(() => {
    dispathAsync(postModule.actions.loadPostList({ category_id, title }));
  }, [dispathAsync, category_id, title]);
  const postList = useSelector(
    postModule.selectors.postListSelector,
    shallowEqual
  );
  const { currentPage, hasMore } = paging(data);
  const handleLoadMore = useCallback(
    (page) => {
      dispathAsync(
        postModule.actions.loadMorePostList({ category_id, title, page })
      );
    },
    [dispathAsync, category_id, title]
  );
  // if (status === apiCallStatus.loading) return <LoadingBox />;
  return (
    <>
      <PostList postList={postList} />
      {status === apiCallStatus.success && postList.length === 0 && (
        <Box textAlign="center">
          <TasksCard.Container>
            <div className="introduction_workplus_platform">
              <h3>{t("Workplus Platform")}</h3>
            </div>
            <TasksCard.Content style={{ padding: 0 }}>
              <div className="introduction_workplus_platform__body">
                <p>
                  {t(
                    "Chào mừng bạn đến với nền tảng phần mềm quản lý công việc làm việc nhóm trực tuyến Workplus!"
                  )}
                </p>
                <p>
                  {t(
                    "Hãy bắt đầu sử dụng Workplus bằng cách thực hiện tiếp các bước sau"
                  )}
                  :
                </p>
                <ul>
                  <li>
                    <p>{t("Thiết lập tài khoản")}</p>
                  </li>
                  <li>
                    <p>{t("Thiết lập nhóm làm việc")}</p>
                  </li>
                  <li>
                    <p>{t("Mời thành viên tham gia nhóm làm việc của bạn")}</p>
                  </li>
                </ul>
                <p>
                  {t("Bạn có thể tìm hiểu thêm về cách sử dụng Workplus tại")}:{" "}
                  <a href="support.workplus.vn">{t("support.workplus.vn")}</a>
                </p>
                <p>
                  {t("Hoặc liên hệ tới")}{" "}
                  <a href="support.workplus.vn">{t("Trung tâm hỗ trợ")}</a>{" "}
                  {t("của Workplus để được tư vấn miễn phí 24/7")}
                </p>
                <p>
                  {t(
                    "Hãy lựa chọn cách làm việc thông minh và Workplus cam kết chung tay xây dựng môi trường làm việc hiệu quả, tiết kiệm"
                  )}
                </p>
              </div>
            </TasksCard.Content>
          </TasksCard.Container>
        </Box>
      )}
      {status === apiCallStatus.loading && <LoadingBox />}
      {hasMore && (
        <MorePosts
          key={asyncId}
          page={currentPage + 1}
          onLoadMore={handleLoadMore}
        />
      )}
    </>
  );
});
