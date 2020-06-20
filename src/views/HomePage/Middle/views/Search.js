import { IconButton, InputBase } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";
import TasksCard from "views/HomePage/components/TasksCard";
import { routes } from "views/HomePage/contant/routes";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import PostList from "../PostList";

const Header = React.memo(({ handleKeyDown, defaultKeyword }) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
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
            <Search style={{ width: "30px", height: "30px" }} />
          </TasksCard.HeaderAvatar>
        }
        action={
          <IconButton
            title={t("Đóng")}
            onClick={() => history.push(routes.home.path)}
            size="small"
          >
            <Close style={{ width: "26px", height: "26px" }} />
          </IconButton>
        }
        title={
          <TasksCard.HeaderTitle>
            <InputBase
              defaultValue={defaultKeyword}
              onKeyDown={handleKeyDown}
              autoFocus
              placeholder={t("Enter your keyword...")}
            />
          </TasksCard.HeaderTitle>
        }
      />
    </TasksCard.Container>
  );
});
export default () => {
  const { keyword: defaultKeyword = "" } = useParams();
  const { t } = useTranslation();
  const history = useHistory();
  const handleKeyDown = useCallback(
    (e) => {
      if (e.which === 13 || e.keyCode === 13 || e.key === "Enter") {
        e.preventDefault();
        history.push(routes.search.path.replace(":keyword", e.target.value));
      }
    },
    [history]
  );
  return (
    <Stack>
      <Header defaultKeyword={defaultKeyword} handleKeyDown={handleKeyDown} />
      <div>
        {t("Kết quả tìm kiếm")} <b>"{defaultKeyword}"</b>
      </div>
      {defaultKeyword && defaultKeyword.length ? (
        <PostList title={defaultKeyword} />
      ) : (
        <EmptyHolder title="" description="" />
      )}
    </Stack>
  );
};
