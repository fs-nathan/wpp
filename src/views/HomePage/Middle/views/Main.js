import { IconButton } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import { mdiGoogleAssistant } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useMountedState } from "react-use";
import TasksCard from "views/HomePage/components/TasksCard";
import { routes } from "views/HomePage/contant/routes";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { PostCreator } from "../PostCreator";
import PostList from "../PostList";

function Main() {
  const history = useHistory();
  const { t } = useTranslation();
  const isMounted = useMountedState();
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
            <IconButton
              onClick={() => {
                history.push(routes.search.path);
              }}
              size="small"
            >
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
      {isMounted && <PostList />}
    </Stack>
  );
}
export default Main;
