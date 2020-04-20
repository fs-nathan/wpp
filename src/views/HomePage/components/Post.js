import { template } from "@hapi/joi/lib/errors";
import { Avatar, Box, IconButton, Typography } from "@material-ui/core";
import {
  AttachFileOutlined,
  CameraAltOutlined,
  ExtensionOutlined,
  InsertEmoticonOutlined,
  MoreVert,
} from "@material-ui/icons";
import { mdiHeartOutline, mdiMessageOutline, mdiThumbUpOutline } from "@mdi/js";
import Icon from "@mdi/react";
import StyledTypo from "components/ColorTypo";
import colors from "helpers/colorPalette";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import { ItemMenu } from "views/SettingGroupPage/GroupPermissionSettings/components/ItemMenu";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import { postAttr } from "../contant/attrs";
import AvatarGroup from "./AvatarGroup";
import Message from "./Message";
import { PostActionButton } from "./PostActionButton";
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
  category_name,
  number_love,
  total_comments,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { t } = useTranslation();
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
              <StyledTypo color="orange" variant="subtitle1">
                {category_name}{" "}
              </StyledTypo>
              {time_label}{" "}
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

        <TasksCard.Media
          srcs={images.map((item) => item.url)}
        ></TasksCard.Media>
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
              # Thông báo
            </Typography>
          )}
          <Box padding="0 20px" display="flex" alignItems="center">
            <Box display="flex" alignItems="center">
              <AvatarGroup
                size={20}
                offset={-4}
                images={[
                  hadLikeUser &&
                    "https://gfxmag.com/wp-content/uploads/2016/07/facebook-love-emoji-emoticon-icon-vector-logo-2.png",
                  last_love_user &&
                    "https://cdn.imgbin.com/10/17/22/imgbin-facebook-like-button-computer-icons-facebook-facebook-like-logo-7Tce85njFXnFkt7uDFwLHY3Wq.jpg",
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
              startIcon={<Icon path={mdiHeartOutline} size={1} />}
            >
              <span>{t("Yêu")}</span>
            </PostActionButton>
            <PostActionButton
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
        <TasksCard.Content>
          <Stack>
            {comments.map((c, i) => (
              <Message key={i} message={c}></Message>
            ))}
            <Box display="flex" alignItems="flex-start">
              <Avatar>A</Avatar>
              <Box
                margin="0 0 0 5px"
                border="1px solid rgba(0, 0, 0, 0.12)"
                height={"40px"}
                display="flex"
                flex="1"
                style={{ background: "#f5f6f7", borderRadius: "20px" }}
                lineHeight={"30px"}
                padding="0 8px"
                alignItems="center"
              >
                <Box flex="1" padding="5px 8px">
                  {t("Viết bình luận")}
                </Box>
                <div>
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
                </div>
              </Box>
            </Box>
          </Stack>
        </TasksCard.Content>
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
    category_name,
    total_comments,
    number_love,
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
  ])(post);
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
        }}
      />
    </PostContext.Provider>
  );
};
