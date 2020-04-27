import { Avatar, Box, ButtonBase, IconButton, Typography } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import colors from "helpers/colorPalette";
import get from "lodash/get";
import React, { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { CommentInput } from "views/HomePage/components/CommentInput";
import Message from "views/HomePage/components/Message";
import { PostCategory, PostContainer, PostContent, PostContext, PostHeader, PostMedia, PostStats } from "views/HomePage/components/Post";
import TasksCard from "views/HomePage/components/TasksCard";
import { commentAttr } from "views/HomePage/contant/attrs";
import { routes } from "views/HomePage/contant/routes";
import { postModule } from "views/HomePage/redux/post";
import { emptyArray, emptyObject } from "views/JobPage/contants/defaultValue";
import { paging } from "views/JobPage/utils";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import AsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/components/AyncTracker";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
const CommentList = React.memo(({ comments = emptyArray, onReplyClick }) => {
  return (
    <>
      {comments.map((c, i) => (
        <Message
          key={i}
          message={c}
          onReplyClick={c.id ? () => onReplyClick(c) : undefined}
        ></Message>
      ))}
    </>
  );
});
const profileSelector = (state) => state.system.profile;

const CommentListContainer = () => {
  const [reply, setReply] = useState();
  const [newComments, setNewComments] = useState([]);
  const profile = useSelector(profileSelector);
  const { t } = useTranslation();
  const { id, inputId, total_comments, number_comment } = useContext(
    PostContext
  );
  const [{}, handleDispatchAsyncAction] = useAsyncTracker();
  const handleComment = useCallback(
    (value) => {
      const asyncId = Date.now();
      setNewComments([
        ...newComments,
        {
          asyncId,
          parent: reply,
          content: value,
          user_create_name: profile.name,
          user_create_avatar: profile.avatar,
        },
      ]);
      setReply(undefined);
      handleDispatchAsyncAction({
        asyncId,
        ...postModule.actions.comment({
          post_id: id,
          content: value,
          parent_id: reply && reply.id,
        }),
      });
    },
    [
      handleDispatchAsyncAction,
      id,
      newComments,
      profile.avatar,
      profile.name,
      reply,
    ]
  );
  const handleReplyClick = useCallback(
    (c) => {
      setReply(c);
      const e = document.querySelector("#" + inputId);
      e && e.focus();
    },
    [inputId]
  );
  const [
    { data, status, asyncId },
    handleLoadCommentAction,
  ] = useAsyncTracker();
  useEffect(() => {
    handleLoadCommentAction(
      postModule.actions.loadCommentListByPost({ post_id: id })
    );
  }, [handleLoadCommentAction, id]);
  const { currentPage, totalPage, hasMore } = paging(data);
  const [asyncIds, setasyncIds] = useState([]);
  useEffect(() => {
    asyncId && setasyncIds([asyncId, ...asyncIds]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asyncId]);
  const { comments, currentCommentNumber } = useSelector((state) => {
    return asyncIds
      .map((asyncId) => get(state, ["apiCall", asyncId], emptyObject))
      .reduce(
        (result, value) => {
          const comments = get(value, ["data", "comments"], emptyArray);
          result.comments = [...result.comments, ...[...comments].reverse()];
          result.currentCommentNumber =
            result.currentCommentNumber +
            comments.length +
            comments.reduce((res, val) => {
              return res + get(val, commentAttr.total_sub_comment, 0);
            }, 0);
          return result;
        },
        {
          comments: [],
          currentCommentNumber: 0,
        }
      );
  });
  return (
    <>
      {number_comment > currentCommentNumber && (
        <Box padding="0 20px" display="flex" alignItems="center">
          <Box
            style={{
              color: colors.blue[0],
            }}
            flex="1"
          >
            {hasMore && (
              <ButtonBase
                onClick={() =>
                  status !== apiCallStatus.loading &&
                  handleLoadCommentAction(
                    postModule.actions.loadMoreCommentList({
                      post_id: id,
                      page: currentPage + 1,
                    })
                  )
                }
              >
                {t("Xem các bình luận trước")}
              </ButtonBase>
            )}
          </Box>

          <Typography color="textSecondary">
            {currentCommentNumber + newComments.length}/
            {number_comment + newComments.length}
          </Typography>
        </Box>
      )}
      <CommentList {...{ comments }} onReplyClick={handleReplyClick} />
      {newComments.map((c, i) => (
        <AsyncTracker asyncId={c.asyncId}>
          {({ data: { data_comment } = { data_comment: emptyObject } }) => {
            const comment = {
              ...c,
              ...data_comment,
            };
            return (
              <Message
                key={i}
                onReplyClick={
                  comment.id ? () => handleReplyClick(comment) : undefined
                }
                message={comment}
              ></Message>
            );
          }}
        </AsyncTracker>
      ))}
      <Box display="flex" alignItems="flex-start">
        <Avatar src={profile.avatar}>{profile.name}</Avatar>
        <CommentInput
          setReply={setReply}
          reply={reply}
          inputId={inputId}
          handleComment={handleComment}
          placeholder={t("Viết bình luận")}
        />
      </Box>
    </>
  );
};
const PostDetail = () => {
  return (
    <>
      <PostHeader />
      <PostContent />
      <PostMedia />
      <PostCategory />
      <PostStats />
      <TasksCard.Content>
        <Stack>
          <CommentListContainer />
        </Stack>
      </TasksCard.Content>
    </>
  );
};
export default ({id}) => {
  // const { id } = useParams();
  const postSelector = useMemo(() => {
    return (state) =>
      postModule.selectors
        .postListSelector(state)
        .find((item) => id === item.id);
  }, [id]);
  const post = useSelector(postSelector);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(postModule.actions.loadPostById({ post_id: id }));
  }, [dispatch, id]);
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <Stack>
      <TasksCard.Container>
        <TasksCard.Header
          avatar={
            <TasksCard.HeaderAvatar aria-label="tasks">
              R
            </TasksCard.HeaderAvatar>
          }
          action={
            <IconButton
              onClick={() => history.push(routes.home.path)}
              size="small"
            >
              <Close style={{ width: "26px", height: "26px" }} />
            </IconButton>
          }
          title={
            <TasksCard.HeaderTitle>
              {t("BẢNG TIN NỘI BỘ - CHI TIẾT")}
            </TasksCard.HeaderTitle>
          }
        />
      </TasksCard.Container>
      <PostContainer post={post}>
        <TasksCard.Container>
          <PostDetail />
        </TasksCard.Container>
      </PostContainer>
    </Stack>
  );
};
