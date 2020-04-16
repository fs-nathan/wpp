import { IconButton, Typography } from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs, loginlineFunc } from "views/JobPage/utils";
import { ItemMenu } from "views/SettingGroupPage/GroupPermissionSettings/components/ItemMenu";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import postAttr from "../redux/post/attr";

const PostMenu = ({ menuAnchor, item, onClose, setMenuAnchor }) => {
  const { t } = useTranslation();
  const options = useMemo(() => {
    return [
      { key: "pin", label: t("Ghim") },
      { key: "highLight", label: t("Nổi bật") },
      { key: "delete", label: t("Xóa") },
    ];
  }, [t]);
  const handleItemClick = (key) => {
    switch (key) {
      case "edit":
        // setModal(<UpdateInfoGroupPermissionModal item={item} />);
        break;
      case "delete":
        // setModal(<DeleteGroupPermissionModal item={item} />);
        break;
      default:
        break;
    }
  };
  return (
    <ItemMenu
      onItemClick={handleItemClick}
      menuAnchor={menuAnchor}
      options={options}
      onClose={() => setMenuAnchor(null)}
    ></ItemMenu>
  );
};

const PostContext = React.createContext({});

const Post = ({
  id,
  title,
  content,
  user_create_id,
  user_create_name,
  user_create_avatar,
  files,
  images = emptyArray,
  position,
  room,
  number_like,
  number_comment,
  comments,
  time_label,
  last_like_user,
  last_love_user,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  return (
    <>
      <TasksCard.Container>
        <TasksCard.Header
          avatar={
            <TasksCard.HeaderAvatar
              style={{ width: "50px", height: "50px" }}
              aria-label="tasks"
              src={user_create_avatar}
            >
              R
            </TasksCard.HeaderAvatar>
          }
          action={
            <div>
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  setAnchorEl(e.currentTarget);
                }}
                size="small"
                aria-label="settings"
              >
                <MoreVert />
              </IconButton>
            </div>
          }
          title={
            <TasksCard.HeaderTitle>
              <b style={{ marginRight: "10px", fontSize: "15px" }}>
                {user_create_name}
              </b>
              <Typography
                style={{ fontSize: "15px", display: "inline" }}
                color="textSecondary"
              >
                {position}
              </Typography>
              {}
            </TasksCard.HeaderTitle>
          }
          subheader={
            <TasksCard.HeaderSubTitle>{time_label}</TasksCard.HeaderSubTitle>
          }
        />
        <TasksCard.Content>
          <Stack>
            <b style={{ fontSize: "16px" }}>{title}</b>
            <Typography
              style={{ fontSize: "15px" }}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {content}
            </Typography>
          </Stack>
        </TasksCard.Content>
        <TasksCard.Media
          srcs={images.map((item) => item.url)}
        ></TasksCard.Media>
      </TasksCard.Container>
      <PostMenu menuAnchor={anchorEl} setMenuAnchor={setAnchorEl} />
    </>
  );
};

export default ({ post }) => {
  const [
    id,
    title,
    content,
    user_create_id,
    user_create_name,
    user_create_avatar,
    files,
    images,
    position,
    room,
    number_like,
    number_comment,
    comments,
    time_label,
    last_like_user,
    last_love_user,
  ] = loginlineFunc(
    createMapPropsFromAttrs([
      postAttr.id,
      postAttr.title,
      postAttr.content,
      postAttr.user_create_id,
      postAttr.user_create_name,
      postAttr.user_create_avatar,
      postAttr.files,
      postAttr.images,
      postAttr.position,
      postAttr.room,
      postAttr.number_like,
      postAttr.number_comment,
      postAttr.comments,
      postAttr.time_label,
      postAttr.last_like_user,
      postAttr.last_love_user,
    ])
  )(post);
  return (
    <PostContext.Provider
      value={{
        id,
        title,
        content,
        user_create_id,
        user_create_name,
        user_create_avatar,
        files,
        images,
        position,
        room,
        number_like,
        number_comment,
        comments,
        time_label,
        last_like_user,
        last_love_user,
      }}
    >
      <Post
        {...{
          id,
          title,
          content,
          user_create_id,
          user_create_name,
          user_create_avatar,
          files,
          images,
          position,
          room,
          number_like,
          number_comment,
          comments,
          time_label,
          last_like_user,
          last_love_user,
        }}
      />
    </PostContext.Provider>
  );
};
