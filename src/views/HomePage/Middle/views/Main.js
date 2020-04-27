import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { mdiGoogleAssistant } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from "react-i18next";
import TasksCard from "views/HomePage/components/TasksCard";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { PostCreator } from "../PostCreator";
import PostList from "../PostList";
function Main() {
  const { t } = useTranslation();
  return (
    <Stack>
      <TasksCard.Container>
        <TasksCard.Header
          avatar={
            <TasksCard.HeaderAvatar
              style={{
                color: "rgb(255, 152, 0)",
                background: "transparent",
              }}
              aria-label="tasks"
            >
              <Icon path={mdiGoogleAssistant} size={2} />
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
      <PostList />
    </Stack>
  );
}
export default Main;
