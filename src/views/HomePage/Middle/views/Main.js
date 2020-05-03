import { IconButton, InputBase } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import { mdiGoogleAssistant } from "@mdi/js";
import Icon from "@mdi/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useMountedState, useToggle } from "react-use";
import TasksCard from "views/HomePage/components/TasksCard";
import { routes } from "views/HomePage/contant/routes";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { PostCreator } from "../PostCreator";
import PostList from "../PostList";
const Header = React.memo(() => {
  const { t } = useTranslation();
  const history = useHistory();
  const [isToggle, toggle] = useToggle();
  return (
    <TasksCard.Container className="comp_Timeline__header">
      {isToggle ? (
        <TasksCard.Header
          avatar={
            <TasksCard.HeaderAvatar
              style={{
                color: "rgb(255, 152, 0)",
                background: "transparent",
              }}
              aria-label="tasks"
            >
              <Search style={{ width: "30px", height: "30px" }} />
            </TasksCard.HeaderAvatar>
          }
          action={
            <IconButton onClick={toggle} size="small">
              <Close />
            </IconButton>
          }
          title={
            <TasksCard.HeaderTitle>
              <InputBase
                onKeyDown={(e) => {
                  if (e.which === 13 || e.keyCode === 13 || e.key === "Enter") {
                    e.preventDefault();
                    history.push(
                      routes.search.path.replace(":keyword", e.target.value)
                    );
                  }
                }}
                autoFocus
                placeholder={t("Enter your keyword...")}
              />
            </TasksCard.HeaderTitle>
          }
        />
      ) : (
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
            <IconButton onClick={toggle} size="small">
              <Search />
            </IconButton>
          }
          title={
            <TasksCard.HeaderTitle>
              {t("BẢNG TIN NỘI BỘ")}
            </TasksCard.HeaderTitle>
          }
        />
      )}
    </TasksCard.Container>
  );
});
function Main() {
  const isMounted = useMountedState();
  return (
    <Stack>
      <Header />
      <PostCreator />
      {isMounted && <PostList />}
    </Stack>
  );
}
export default Main;
