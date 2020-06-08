import { Avatar, Box, ButtonBase, Typography } from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import ReplyIcon from "@material-ui/icons/Reply";
import { showImagesList } from "actions/chat/chat";
import colors from "helpers/colorPalette";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { emptyArray, emptyObject } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs, get, paging } from "views/JobPage/utils";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { commentAttr } from "../contant/attrs";
import { postModule } from "../redux/post";
import "./Message.css";
import { PostContext, PostFilesStateLess } from "./Post";
const RepliesContainer = ({
  total_sub_comment,
  post_id,
  comment_id,
  onReplyClick,
}) => {
  const { t } = useTranslation();
  const [
    { data, status, asyncId },
    handleLoadCommentAction,
  ] = useAsyncTracker();
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
  const handleLoadFirst = useCallback(() => {
    handleLoadCommentAction(
      postModule.actions.loadReplyList({ post_id, comment_id })
    );
  }, [comment_id, handleLoadCommentAction, post_id]);
  const handleLoadMore = useCallback(
    (page) => {
      handleLoadCommentAction(
        postModule.actions.loadMoreReplyList({ post_id, comment_id, page })
      );
    },
    [comment_id, handleLoadCommentAction, post_id]
  );
  const [show, setShow] = useState(false);
  if (!total_sub_comment) return null;
  return (
    <>
      <ButtonBase
        onClick={() => {
          if (!show) {
            setShow(true);
            if (
              status === apiCallStatus.success ||
              status === apiCallStatus.loading
            )
              return;
            handleLoadFirst();
          } else {
            setShow(false);
            // handleLoadMore(asyncIds.length);
          }
        }}
        className="cursor-pointer comp_Message__expand"
      >
        {show ? (
          <ExpandLess></ExpandLess>
        ) : (
          <ReplyIcon
            style={{
              transform: "rotate(180deg)",
            }}
          ></ReplyIcon>
        )}
        {total_sub_comment} {t("phản hồi")}
      </ButtonBase>
      {show &&
        comments.map((c, i) => {
          return <Reply key={i} reply={c} onReplyClick={onReplyClick}></Reply>;
        })}
    </>
  );
};
export const Reply = ({ reply, onReplyClick }) => {
  const [
    id,
    content,
    user_create_name,
    user_create_avatar,
    images,
    images_id,
    images_url,
    images_size,
    images_type,
    files,
    sticker,
    total_sub_comment,
  ] = createMapPropsFromAttrs([
    commentAttr.id,
    commentAttr.content,
    commentAttr.user_create_name,
    commentAttr.user_create_avatar,
    commentAttr.images,
    commentAttr.images_id,
    commentAttr.images_url,
    commentAttr.images_size,
    commentAttr.images_type,
    commentAttr.files,
    commentAttr.sticker,
    commentAttr.total_sub_comment,
  ])(reply);
  return (
    <Message
      type="reply"
      parent={reply.parent}
      {...{
        id,
        content,
        onReplyClick,
        user_create_name,
        user_create_avatar,
        images,
        images_id,
        images_url,
        images_size,
        images_type,
        files,
        sticker,
      }}
    />
  );
};
const Message = ({
  type = "comment",
  post_id,
  parent,
  id,
  onReplyClick,
  content,
  user_create_name,
  user_create_avatar,
  comments,
  total_sub_comment,
  images = emptyArray,
  images_id,
  images_url,
  images_size,
  images_type,
  files,
  sticker,
  stickerUrl,
}) => {
  const { t } = useTranslation();
  return (
    <div className={"comp_Message"}>
      <Avatar className="comp_Message__avatar" src={user_create_avatar}>
        {user_create_name && user_create_name[0]}
      </Avatar>
      <Box margin="2px 0 0 5px">
        <div className="comp_Message__content">
          {parent && (
            <Box
              color={colors.gray[0]}
              padding="0 4px"
              borderLeft={`2px solid ${colors.blue[0]}`}
            >
              <b>{get(parent, commentAttr.user_create_name)}</b>{" "}
              {get(parent, commentAttr.content)}
            </Box>
          )}
          <span className="comp_Message__creator">{user_create_name}</span>
          <span className="comp_Message__message">{content}</span>
        </div>
        {sticker && (
          <div className="comp_Message__sticker">
            <Sticker {...{ sticker: stickerUrl || sticker }}></Sticker>
          </div>
        )}
        {images.map((image, i) => (
          <div key={i} className="comp_Message__sticker">
            <Image image={image}></Image>
          </div>
        ))}
        {!!files && !!files.length && (
          <div className="comp_Message__files">
            <PostFilesStateLess files={files} />
          </div>
        )}
        <Box padding="0 10px">
          {onReplyClick && (
            <ButtonBase
              onClick={onReplyClick}
              className="comp_Message__reply u-fontSize12"
            >
              {t("Trả lời")}
            </ButtonBase>
          )}
          <Typography
            className=" u-fontSize12"
            component="span"
            color="textSecondary"
          >
            2 giờ
          </Typography>
          {type === "comment" && (
            <RepliesContainer
              {...{ total_sub_comment, post_id, comment_id: id, onReplyClick }}
            />
          )}
          {comments &&
            comments.map((c, i) => {
              return (
                <Reply key={i} reply={c} onReplyClick={onReplyClick}></Reply>
              );
            })}
        </Box>
      </Box>
    </div>
  );
};
export default ({ message, comments, onReplyClick }) => {
  const { id: post_id } = useContext(PostContext);
  const [
    id,
    content,
    user_create_name,
    user_create_avatar,
    images,
    files,
    sticker,

    total_sub_comment,
  ] = createMapPropsFromAttrs([
    commentAttr.id,
    commentAttr.content,
    commentAttr.user_create_name,
    commentAttr.user_create_avatar,
    commentAttr.images,
    commentAttr.files,
    commentAttr.sticker,
    commentAttr.total_sub_comment,
  ])(message);
  return (
    <Message
      comments={comments}
      parent={message.parent}
      {...{
        id,
        post_id,
        content,
        onReplyClick,
        user_create_name,
        user_create_avatar,
        images,
        files,
        sticker,
        stickerUrl: message.stickerUrl,
        total_sub_comment,
      }}
    />
  );
};

const Sticker = React.memo(({ sticker }) => {
  // const listStickers = useSelector((state) => state.chat.listStickers);
  // const item = (listStickers || emptyArray).find((item) => item.id === sticker);
  // console.log({ listStickers, sticker });
  // if (!item || !item.url) return null;
  return <img src={sticker} />;
});
const Image = React.memo(({ image }) => {
  const dispatch = useDispatch();
  return (
    <img
      src={image.url_thumb}
      onClick={() =>
        dispatch(
          showImagesList(true, [
            {
              ...image,
              url: image.url_thumb,
            },
          ])
        )
      }
    />
  );
});
