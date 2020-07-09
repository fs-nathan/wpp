import { Avatar, Box, ButtonBase, Typography } from "@material-ui/core";
import { ExpandLess } from "@material-ui/icons";
import ReplyIcon from "@material-ui/icons/Reply";
import { showImagesList } from "actions/chat/chat";
import AlertModal from "components/AlertModal";
import colors from "helpers/colorPalette";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { emptyArray, emptyObject } from "views/JobPage/contants/defaultValue";
import { get, paging } from "views/JobPage/utils";
import AsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/components/AyncTracker";
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
          console.log({ c });
          if (c.asyncId) {
            return (
              <AsyncTracker asyncId={c.asyncId}>
                {({
                  data: { data_comment } = { data_comment: emptyObject },
                }) => {
                  const comment = {
                    ...c,
                    ...data_comment,
                    can_modify: !!data_comment.id && true,
                  };
                  return (
                    <Reply
                      key={i}
                      reply={comment}
                      onReplyClick={onReplyClick}
                    ></Reply>
                  );
                }}
              </AsyncTracker>
            );
          }
          return <Reply key={i} reply={c} onReplyClick={onReplyClick}></Reply>;
        })}
    </>
  );
};
export const Reply = ({ reply, onReplyClick }) => {
  const [{ status }, handleDeleteComment] = useAsyncTracker();
  const [modal, setModal] = useState();
  const { t } = useTranslation();
  return (
    <>
      <Message
        type="reply"
        parent={reply.parent}
        {...{
          ...reply,
          onReplyClick,
          deleted: status === apiCallStatus.success,
          onDelete:
            reply.id && reply.can_modify
              ? () => {
                  setModal(
                    <AlertModal
                      open={true}
                      setOpen={setModal}
                      content={t("Bạn có muốn xóa bình luận ?")}
                      onConfirm={() => {
                        const asyncId = Date.now();
                        handleDeleteComment({
                          asyncId,
                          ...postModule.actions.deleteComment({
                            comment_id: reply.id,
                          }),
                        });
                        setModal(undefined);
                      }}
                      onCancle={() => setModal(undefined)}
                      manualClose={true}
                    />
                  );
                }
              : undefined,
        }}
      />
      {!!modal && modal}
    </>
  );
};
const Message = ({
  type = "comment",
  can_modify,
  post_id,
  parent,
  id,
  onReplyClick,
  onDelete,
  content,
  deleted,
  user_create_name,
  user_create_avatar,
  comments,
  total_sub_comment,
  images = emptyArray,
  images_id,
  images_url,
  images_size,
  images_type,
  time_label,
  files,
  sticker,
  stickerUrl,
}) => {
  const { t } = useTranslation();
  if (deleted) {
    return null;
  }
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
          {can_modify && onDelete && (
            <ButtonBase
              onClick={onDelete}
              className="comp_Message__reply u-fontSize12"
            >
              {t("Xóa")}
            </ButtonBase>
          )}
          <Typography
            className=" u-fontSize12"
            component="span"
            color="textSecondary"
          >
            {time_label}
          </Typography>
          {type === "comment" && (
            <RepliesContainer
              {...{ total_sub_comment, post_id, comment_id: id, onReplyClick }}
            />
          )}
          {comments &&
            comments.map((c, i) => {
              if (c.asyncId) {
                return (
                  <AsyncTracker asyncId={c.asyncId}>
                    {({
                      data: { data_comment } = { data_comment: emptyObject },
                    }) => {
                      const comment = {
                        ...c,
                        ...data_comment,
                        can_modify: !!data_comment.id && true,
                      };
                      return (
                        <Reply
                          key={i}
                          reply={comment}
                          onReplyClick={onReplyClick}
                        ></Reply>
                      );
                    }}
                  </AsyncTracker>
                );
              }
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
  const [modal, setModal] = useState();
  const [{ status }, handleDeleteComment] = useAsyncTracker();
  const { t } = useTranslation();
  return (
    <>
      <Message
        comments={comments}
        parent={message.parent}
        {...{
          ...message,
          post_id,
          deleted: status === apiCallStatus.success,
          onReplyClick,
          onDelete:
            message.id && message.can_modify
              ? () => {
                  setModal(
                    <AlertModal
                      open={true}
                      setOpen={setModal}
                      content={t("Bạn có muốn xóa bình luận ?")}
                      onConfirm={() => {
                        const asyncId = Date.now();
                        handleDeleteComment({
                          asyncId,
                          ...postModule.actions.deleteComment({
                            comment_id: message.id,
                          }),
                        });
                        setModal(undefined);
                      }}
                      onCancle={() => setModal(undefined)}
                      manualClose={true}
                    />
                  );
                }
              : undefined,
          time_label: message.time_label,
        }}
      />
      {!!modal && modal}
    </>
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
  const url = image.url_thumb || image.url;
  return (
    <img
      src={url}
      onClick={() =>
        dispatch(
          showImagesList(true, [
            {
              ...image,
              url: url,
              url_thumbnail: image.url_thumb || image.url,
            },
          ])
        )
      }
    />
  );
});
