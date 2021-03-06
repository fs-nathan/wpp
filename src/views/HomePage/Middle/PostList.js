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
        <Button style={{ display: "block" }}>H???t r???i</Button>
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
                    "Ch??o m???ng b???n ?????n v???i n???n t???ng ph???n m???m qu???n l?? c??ng vi???c l??m vi???c nh??m tr???c tuy???n Workplus!"
                  )}
                </p>
                <p>
                  {t(
                    "H??y b???t ?????u s??? d???ng Workplus b???ng c??ch th???c hi???n ti???p c??c b?????c sau"
                  )}
                  :
                </p>
                <ul>
                  <li>
                    <p>{t("Thi???t l???p t??i kho???n")}</p>
                  </li>
                  <li>
                    <p>{t("Thi???t l???p nh??m l??m vi???c")}</p>
                  </li>
                  <li>
                    <p>{t("M???i th??nh vi??n tham gia nh??m l??m vi???c c???a b???n")}</p>
                  </li>
                </ul>
                <p>
                  {t("B???n c?? th??? t??m hi???u th??m v??? c??ch s??? d???ng Workplus t???i")}:{" "}
                  <a href="support.workplus.vn">{t("support.workplus.vn")}</a>
                </p>
                <p>
                  {t("Ho???c li??n h??? t???i")}{" "}
                  <a href="support.workplus.vn">{t("Trung t??m h??? tr???")}</a>{" "}
                  {t("c???a Workplus ????? ???????c t?? v???n mi???n ph?? 24/7")}
                </p>
                <p>
                  {t(
                    "H??y l???a ch???n c??ch l??m vi???c th??ng minh v?? Workplus cam k???t chung tay x??y d???ng m??i tr?????ng l??m vi???c hi???u qu???, ti???t ki???m"
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
