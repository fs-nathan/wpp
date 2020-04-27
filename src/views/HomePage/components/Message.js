import { Avatar, Box, Typography } from "@material-ui/core";
import colors from "helpers/colorPalette";
import React from "react";
import { useTranslation } from "react-i18next";
import { createMapPropsFromAttrs, loginlineFunc } from "views/JobPage/utils";
import { commentAttr } from "../contant/attrs";
const Message = ({
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
      <Box lineHeight={"30px"} margin="5px 0 0 5px">
        <Box
          style={{ background: "#f5f6f7", borderRadius: "15px" }}
          lineHeight={"30px"}
          padding="0 8px"
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
          <span>{content}</span>
        </Box>
        <Box padding="0 8px">
          <span
            style={{
              marginRight: "8px",
              color: colors.blue[0],
            }}
          >
            {t("Trả lời")}
          </span>
          <Typography component="span" color="textSecondary">
            2 giờ
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
export default ({ message }) => {
  const [
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
      }}
    />
  );
};
