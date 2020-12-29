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
          <EmptyHolder
            image={
              <img style={{ width: "80%" }} src={nodataimg} alt="empty"></img>
            }
            title={""}
            description={""}
          />
          <Typography color="textSecondary" component="div">
            {t("Không tìm thấy kết quả!")}
          </Typography>
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
