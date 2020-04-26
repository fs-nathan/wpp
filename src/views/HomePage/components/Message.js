import { Avatar, Box, ButtonBase, Typography } from "@material-ui/core";
import ReplyIcon from "@material-ui/icons/Reply";
import colors from "helpers/colorPalette";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  createMapPropsFromAttrs,
  get,
  loginlineFunc,
} from "views/JobPage/utils";
import { commentAttr } from "../contant/attrs";
const Message = ({
  parent,
  id,
  onReplyClick,
  content,
  user_create_name,
  user_create_avatar,
  comments,
  images,
  images_id,
  images_url,
  images_size,
  images_type,
  files,
  sticker,
}) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" alignItems="flex-start">
      <Avatar src={user_create_avatar}>
        {user_create_name && user_create_name[0]}
      </Avatar>
      <Box margin="2px 0 0 5px">
        <div
          style={{
            // minHeight: "30px",
            lineHeight: "22px",
            padding: "8px 8px",
            background: "#f5f6f7",
            borderRadius: "15px",
          }}
        >
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
          <span
            style={{
              marginRight: "8px",
              fontWeight: "bold",
              color: colors.blue[0],
            }}
          >
            {user_create_name}
          </span>
          {content}
        </div>
        <Box padding="0 10px">
          {onReplyClick && (
            <ButtonBase
              onClick={onReplyClick}
              style={{
                marginRight: "8px",
                color: colors.blue[0],
              }}
            >
              {t("Trả lời")}
            </ButtonBase>
          )}
          <Typography component="span" color="textSecondary">
            2 giờ
          </Typography>
          {comments && comments.length && (
            <Box>
              <ReplyIcon style={{ padding: "8px" }}></ReplyIcon>
              {t("phản hồi")}
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default ({ message, onReplyClick }) => {
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
    comments,
  ] = loginlineFunc(
    createMapPropsFromAttrs([
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
      commentAttr.comments,
    ])
  )(message);
  return (
    <Message
      parent={message.parent}
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
        comments,
      }}
    />
  );
};
