import { IconButton, InputBase } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { useDebounce } from "react-use";
import TasksCard from "views/HomePage/components/TasksCard";
import { routes } from "views/HomePage/contant/routes";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import PostList from "../PostList";

const Header = React.memo(({ handleInputChange }) => {
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
            onClick={() => history.push(routes.home.path)}
            size="small"
          >
            <Close style={{ width: "26px", height: "26px" }} />
          </IconButton>
        }
        title={
          <TasksCard.HeaderTitle>
            <InputBase
              onChange={handleInputChange}
              autoFocus
              placeholder={t("Enter your keyword...")}
            />
          </TasksCard.HeaderTitle>
        }
      />
    </TasksCard.Container>
  );
});
export default ({ id }) => {
  // const { id } = useParams();
  const [keyword, setKeyword] = useState("");
  const handleInputChange = useCallback((e) => {
    setKeyword(e.target.value);
  }, []);
  const [debouncedValue, setDebouncedValue] = React.useState(null);

  const [, cancel] = useDebounce(
    () => {
      setDebouncedValue(keyword);
    },
    300,
    [keyword]
  );
  return (
    <Stack>
      <Header handleInputChange={handleInputChange} />
      {keyword && keyword.length ? (
        <PostList title={debouncedValue} />
      ) : (
        <EmptyHolder title="" description="" />
      )}
    </Stack>
  );
};
