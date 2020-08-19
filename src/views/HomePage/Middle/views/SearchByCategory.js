import { IconButton } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";
import get from "lodash/get";
import React from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import TasksCard from "views/HomePage/components/TasksCard";
import { routes } from "views/HomePage/contant/routes";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { categoryListSelector } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import PostList from "../PostList";

const Header = React.memo(({ categoryName }) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <TasksCard.Container className="comp_Timeline__header">
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
            {t("BẢNG TIN NỘI BỘ")} - {categoryName}
          </TasksCard.HeaderTitle>
        }
      />
    </TasksCard.Container>
  );
});
export default () => {
  const { id: category_id } = useParams();
  const category = useSelector((state) =>
    categoryListSelector(state).find((item) => item.id === category_id)
  );
  const categoryName = get(category, "name");
  return (
    <Stack>
      <Header categoryName={categoryName} />
      <PostList category_id={category_id} />
    </Stack>
  );
};
