import { Avatar, Box, Button, IconButton, Typography } from "@material-ui/core";
import {
  AttachFileOutlined,
  CameraAltOutlined,
  ExtensionOutlined,
  InsertEmoticonOutlined,
  MoreVert,
} from "@material-ui/icons";
import { mdiArmFlexOutline, mdiHeartOutline, mdiMessageOutline } from "@mdi/js";
import Icon from "@mdi/react";
import colors from "helpers/colorPalette";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import { ItemMenu } from "views/SettingGroupPage/GroupPermissionSettings/components/ItemMenu";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import postAttr from "../redux/post/attr";
import AvatarGroup from "./AvatarGroup";
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
  const { t } = useTranslation();
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
          <Box padding="0 20px" display="flex" alignItems="center">
            <div>
              <AvatarGroup
                size={20}
                offset={-4}
                images={[
                  "https://appapi.workplus.vn/avatars/1586430794068-filename",
                  "https://appapi.workplus.vn/avatars/1586430794068-filename",
                ]}
              ></AvatarGroup>
            </div>
            <Box padding="0 4px" flex="1" whiteSpace="now-wrap">
              <span href="#">Ngọc phạm</span>,{" "}
              <span href="#">Thanh Mai Nguyển</span> và 280 người khác
            </Box>
            <Typography color="textSecondary">203 bình luận</Typography>
          </Box>
          <Box
            display="flex"
            borderTop="1px solid rgba(0, 0, 0, 0.12)"
            borderBottom="1px solid rgba(0, 0, 0, 0.12)"
            alignItems="center"
          >
            <Button
              style={{ flex: 1, margin: "4px" }}
              startIcon={<Icon path={mdiHeartOutline} size={1} />}
            >
              {t("Yêu")}
            </Button>
            <Button
              style={{ flex: 1, margin: "4px" }}
              startIcon={<Icon path={mdiArmFlexOutline} size={1} />}
            >
              {t("Thích")}
            </Button>
            <Button
              style={{ flex: 1, margin: "4px" }}
              startIcon={<Icon path={mdiMessageOutline} size={1} />}
            >
              {t("Bình luận")}
            </Button>
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
            <Box display="flex" alignItems="flex-start">
              <Avatar>A</Avatar>
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
                    Hà hãi lê
                  </span>
                  <span>Con đường cách mang còn lắm gian truân</span>
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
