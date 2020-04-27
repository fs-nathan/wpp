import {
  Avatar,
  Box,
  ButtonBase,
  Chip,
  Dialog,
  IconButton,
  Typography,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { mdiDotsHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useToggle } from "react-use";
import { loginlineParams, template } from "views/JobPage/utils";
import { ChipGroup } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ChipGroup";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import { PostCreatorPopupInner } from "./PostCreatorPopupInner";
import PostList from "./PostList";
const PostCreator = () => {
  const { t } = useTranslation();
  const [isToggle, toggle] = useToggle();
  return (
    <TasksCard.Container>
      <Box
        padding="8px 16px"
        fontWeight="bold"
        style={{
          background: "#f5f6f7",
          borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
        }}
      >
        {t("Tạo bài viết")}
      </Box>
      <TasksCard.Content>
        <Stack>
          <Box display="flex" alignItems="center">
            <Avatar>A</Avatar>
            <Box padding="16px" onClick={() => toggle()}>
              <Typography
                variant="body2"
                color="textSecondary"
                style={{ fontSize: "15px" }}
              >
                {template(t("<%= name %> ơi bạn muốn đăng gì"))({
                  name: "Nguyễn",
                })}
              </Typography>
            </Box>
          </Box>
          <Box
            style={{
              paddingTop: "4px",
              borderTop: "1px solid rgba(0, 0, 0, 0.12)",
            }}
          >
            <ChipGroup>
              <Chip
                style={{
                  background: "#f5f6f7",
                }}
                onClick={loginlineParams}
                avatar={<Avatar alt={t("Sự kiện")}>a</Avatar>}
                label={t("Sự kiện")}
              />
              <Chip
                style={{
                  background: "#f5f6f7",
                }}
                onClick={loginlineParams}
                avatar={<Avatar alt={t("Thông báo")}>t</Avatar>}
                label={t("Thông báo")}
              />
              <Chip
                style={{
                  background: "#f5f6f7",
                }}
                onClick={loginlineParams}
                avatar={<Avatar alt={t("Chia sẻ")}>c</Avatar>}
                label={t("Chia sẻ")}
              />
              <Box flex={1}></Box>
              <ButtonBase
                size="small"
                style={{
                  height: "32px",
                  lineHeight: "32px",
                  borderRadius: "32px",
                  padding: "0 12px",
                  background: "#f5f6f7",
                }}
              >
                <Icon
                  fill={"rgba(0, 0, 0, 0.54)"}
                  path={mdiDotsHorizontal}
                  width="20px"
                />
              </ButtonBase>
            </ChipGroup>
          </Box>
        </Stack>
      </TasksCard.Content>
      <Dialog onClose={toggle} fullWidth={true} maxWidth={"sm"} open={isToggle}>
        <PostCreatorPopupInner />
      </Dialog>
    </TasksCard.Container>
  );
};
function Middle() {
  const { t } = useTranslation();
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
            <IconButton size="small">
              <Search style={{ width: "26px", height: "26px" }} />
            </IconButton>
          }
          title={
            <TasksCard.HeaderTitle>
              {t("BẢNG TIN NỘI BỘ")}
            </TasksCard.HeaderTitle>
          }
        />
      </TasksCard.Container>
      <PostCreator />
      {/* <PostCreatorPopupInner /> */}
      <PostList />
    </Stack>
  );
}

export default Middle;
