import {
  Avatar,
  Box,
  IconButton,
  InputBase,
  SvgIcon,
  Typography,
} from "@material-ui/core";
import {
  AttachFileOutlined,
  CameraAltOutlined,
  ExtensionOutlined,
  InsertEmoticonOutlined,
  MoreVert,
} from "@material-ui/icons";
import {
  mdiHeartOutline,
  mdiMessageOutline,
  mdiPin,
  mdiThumbUpOutline,
} from "@mdi/js";
import Icon from "@mdi/react";
import StyledTypo from "components/ColorTypo";
import colors from "helpers/colorPalette";
import React, { useCallback, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs, template } from "views/JobPage/utils";
import { ItemMenu } from "views/SettingGroupPage/GroupPermissionSettings/components/ItemMenu";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import { postAttr } from "../contant/attrs";
import { postModule } from "../redux/post";
import AvatarGroup from "./AvatarGroup";
import likeImage from "./like-image.jpg";
import loveImage from "./love-image.png";
import Message from "./Message";
import { PostActionButton } from "./PostActionButton";
const PostMenu = ({
  menuAnchor,
  item,
  options,
  handleActionClick,
  setMenuAnchor,
}) => {
  const handleItemClick = handleActionClick;
  return (
    <ItemMenu
      onItemClick={handleItemClick}
      menuAnchor={menuAnchor}
      options={options}
      onClose={() => setMenuAnchor(null)}
    ></ItemMenu>
  );
};
const CommentInput = React.memo(({ placeholder, handleComment }) => {
  return (
    <Box
      alignSelf="flex-end"
      margin="0 0 0 5px"
      border="1px solid rgba(0, 0, 0, 0.12)"
      minHeight={"40px"}
      display="flex"
      flex="1"
      style={{ background: "#f5f6f7", borderRadius: "20px" }}
      lineHeight={"30px"}
      padding="0 8px"
    >
      <InputBase
        onKeyPress={(e) => {
          if (e.which == 13 || e.keyCode == 13) {
            e.preventDefault();
            handleComment(e.target.value);
            e.target.value = "";
          }
        }}
        multiline
        style={{ flex: 1, padding: "5px 8px", lineHeight: 1.5 }}
        placeholder={placeholder}
      ></InputBase>
      <Box display="flex" alignItems="center" height={"40px"}>
        <IconButton size="small" aria-label="delete">
          <InsertEmoticonOutlined />
        </IconButton>
        <IconButton size="small" aria-label="delete">
          <CameraAltOutlined />
        </IconButton>
        <IconButton size="small" aria-label="delete">
          <AttachFileOutlined />
        </IconButton>
        <IconButton size="small" aria-label="delete">
          <ExtensionOutlined />
        </IconButton>
      </Box>
    </Box>
  );
});
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
  category_name,
  number_love,
  total_comments,
  is_highlight,
  is_pin,
  menuoptions,
  handleActionClick,
  handleComment,
}) => {
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let otherNumber = Number(number_like) + Number(number_love);
  const hadLikeUser = last_like_user && last_like_user !== null;
  const hadLoveUser = last_love_user && last_love_user !== null;
  if (hadLikeUser) otherNumber = otherNumber - 1;
  if (hadLoveUser) otherNumber = otherNumber - 1;
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
            </TasksCard.HeaderTitle>
          }
          subheader={
            <TasksCard.HeaderSubTitle>
              <StyledTypo component="span" color="orange" variant="subtitle1">
                {category_name}{" "}
              </StyledTypo>
              {time_label}{" "}
              {is_pin && (
                <SvgIcon style={{ verticalAlign: "middle", padding: "0 10px" }}>
                  <path d={mdiPin}></path>
                </SvgIcon>
              )}
            </TasksCard.HeaderSubTitle>
          }
        />
        <TasksCard.Content>
          <Stack>
            <b style={{ fontSize: "17px" }}>{title}</b>
            <Typography
              style={{ fontSize: "15px" }}
              variant="body2"
              color="textSecondary"
            >
              {content}
            </Typography>
          </Stack>
        </TasksCard.Content>

        <TasksCard.Media images={images}></TasksCard.Media>
        <Stack>
          <div />
          {!!category_name && (
            <Typography
              color="textSecondary"
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                padding: "0 20px",
              }}
            >
              # {category_name}
            </Typography>
          )}
          <Box padding="0 20px" display="flex" alignItems="center">
            <Box display="flex" alignItems="center">
              <AvatarGroup
                size={20}
                offset={-4}
                images={[
                  hadLikeUser && likeImage,
                  hadLoveUser && loveImage,
                ].filter((item) => item)}
              ></AvatarGroup>
            </Box>
            <Box padding="0 4px" flex="1" whiteSpace="now-wrap">
              {[
                hadLikeUser && <span href="#">{last_like_user}</span>,
                hadLoveUser && <span href="#">{last_love_user}</span>,
                !!otherNumber && (
                  <span>
                    {template(t("<%= numner %> người khác"))({
                      numner: otherNumber,
                    })}
                  </span>
                ),
              ]
                .filter((item) => item)
                .map((item, i, array) => {
                  if (i === array.length - 2) {
                    return (
                      <>
                        {item}
                        {" và "}
                      </>
                    );
                  }
                  if (i < array.length - 1) {
                    return (
                      <>
                        {item}
                        {" ,"}
                      </>
                    );
                  }
                  return item;
                })}
              {}
            </Box>
          </Box>
          <Box
            display="flex"
            borderTop="1px solid rgba(0, 0, 0, 0.12)"
            borderBottom="1px solid rgba(0, 0, 0, 0.12)"
            alignItems="center"
          >
            <PostActionButton
              onClick={() => handleActionClick("love")}
              startIcon={<Icon path={mdiHeartOutline} size={1} />}
            >
              <span>{t("Yêu")}</span>
            </PostActionButton>
            <PostActionButton
              onClick={() => handleActionClick("like")}
              startIcon={<Icon path={mdiThumbUpOutline} size={1} />}
            >
              {t("Thích")}
            </PostActionButton>
            <PostActionButton
              startIcon={<Icon path={mdiMessageOutline} size={1} />}
            >
              {t("Bình luận")}
            </PostActionButton>
          </Box>
          <Box padding="0 20px" display="flex" alignItems="center">
            <Box
              style={{
                color: colors.blue[0],
              }}
              flex="1"
            >
              {t("Xem các bình luận trước")}
            </Box>
            <Typography color="textSecondary">3/181</Typography>
          </Box>
        </Stack>
        {is_highlight && <TasksCard.HighLight />}

        <TasksCard.Content>
          <Stack>
            {comments.map((c, i) => (
              <Message key={i} message={c}></Message>
            ))}
            <Box display="flex" alignItems="flex-start">
              <Avatar>A</Avatar>
              <CommentInput
                handleComment={handleComment}
                placeholder={t("Viết bình luận")}
              />
            </Box>
          </Stack>
        </TasksCard.Content>
      </TasksCard.Container>
      <PostMenu
        menuAnchor={anchorEl}
        handleActionClick={handleActionClick}
        setMenuAnchor={setAnchorEl}
        options={menuoptions}
      />
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
    category_name,
    total_comments,
    number_love,
    is_highlight,
    is_pin,
  ] = createMapPropsFromAttrs([
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
    postAttr.category_name,
    postAttr.total_comments,
    postAttr.number_love,
    postAttr.is_highlight,
    postAttr.is_pin,
  ])(post);
  const dispatch = useDispatch();
  const handleActionClick = useCallback(
    (key) => {
      switch (key) {
        case "highLight":
          dispatch(postModule.actions.makePostHighLight({ post_id: id }));
          break;
        case "cancel-highLight":
          dispatch(postModule.actions.cancelPostHighLight({ post_id: id }));
        case "pin":
          dispatch(postModule.actions.pinPost({ post_id: id }));
          break;
        case "cancel-pin":
          dispatch(postModule.actions.cancelPinPost({ post_id: id }));
          break;
        case "delete":
          dispatch(postModule.actions.deletePost({ post_id: id }));
          break;
        case "like":
          dispatch(postModule.actions.like({ post_id: id }));
          break;
        case "love":
          dispatch(postModule.actions.love({ post_id: id }));
          break;
        default:
          break;
      }
    },
    [id]
  );
  const { t } = useTranslation();

  const menuoptions = useMemo(() => {
    return [
      !is_pin
        ? { key: "pin", label: t("Ghim") }
        : { key: "cancel-pin", label: t("Bỏ ghim") },
      !is_highlight
        ? { key: "highLight", label: t("Nổi bật") }
        : { key: "cancel-highLight", label: t("Bỏ nổi bật") },
      { key: "delete", label: t("Xóa") },
    ];
  }, [t, is_pin, is_highlight]);

  const handleComment = useCallback(
    (value) => {
      dispatch(postModule.actions.comment({ post_id: id, content: value }));
    },
    [id]
  );
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
        category_name,
        total_comments,
        number_love,
        is_highlight,
        is_pin,
        menuoptions,
        handleActionClick,
        handleComment,
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
          category_name,
          total_comments,
          number_love,
          is_highlight,
          is_pin,
          menuoptions,
          handleActionClick,
          handleComment,
        }}
      />
    </PostContext.Provider>
  );
};
