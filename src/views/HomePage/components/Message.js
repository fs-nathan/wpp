import { Avatar, Box, ButtonBase, Typography } from "@material-ui/core";
import colors from "helpers/colorPalette";
import React from "react";
import { useTranslation } from "react-i18next";
import { createMapPropsFromAttrs, loginlineFunc } from "views/JobPage/utils";
import { commentAttr } from "../contant/attrs";
const Message = ({
  id,
  onReplyClick,
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
}) => {
  const { t } = useTranslation();
  return (
    <Box display="flex" alignItems="flex-start">
      <Avatar src={user_create_avatar}>
        {user_create_name && user_create_name[0]}
      </Avatar>
      <Box margin="5px 0 0 5px">
        <div
          style={{
            // minHeight: "30px",
            lineHeight: "22px",
            padding: "4px 8px",
            background: "#f5f6f7",
            borderRadius: "15px",
          }}
        >
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
    ])
  )(message);
  return (
    <Message
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
