import {
  Avatar,
  Box,
  ButtonBase,
  Chip,
  IconButton,
  Typography,
} from "@material-ui/core";
import { MoreVert, Search } from "@material-ui/icons";
import { mdiDotsHorizontal } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { loginlineParams, template } from "views/JobPage/utils";
import { ChipGroup } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ChipGroup";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";

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
              <Box padding="16px">
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
      </TasksCard.Container>
      {new Array(30).fill(true).map((v, i) => (
        <TasksCard.Container key={i}>
          <TasksCard.Header
            avatar={
              <TasksCard.HeaderAvatar
                style={{ width: "50px", height: "50px" }}
                aria-label="tasks"
              >
                R
              </TasksCard.HeaderAvatar>
            }
            action={
              <div>
                <IconButton size="small" aria-label="settings">
                  <MoreVert />
                </IconButton>
              </div>
            }
            title={
              <TasksCard.HeaderTitle>
                <b style={{ marginRight: "10px" }}>Trần thu phương</b> Chuyên
                viên - Phòng hành chính nhân sự
              </TasksCard.HeaderTitle>
            }
            subheader={
              <TasksCard.HeaderSubTitle>
                September 14, 2016
              </TasksCard.HeaderSubTitle>
            }
          />
          <TasksCard.Content>
            <Typography variant="body2" color="textSecondary" component="p">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </TasksCard.Content>
        </TasksCard.Container>
      ))}
    </Stack>
  );
}

export default Middle;
