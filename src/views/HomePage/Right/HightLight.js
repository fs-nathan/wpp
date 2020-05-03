import { Avatar, Box, ButtonBase } from "@material-ui/core";
import { mdiStarHalf } from "@mdi/js";
import Icon from "@mdi/react";
import StyledTypo from "components/ColorTypo";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import { routes } from "../contant/routes";
import { postModule } from "../redux/post";
export const HightLight = ({ posts }) => {
  const { t } = useTranslation();
  const history = useHistory();
  return (
    <TasksCard.Container>
      <TasksCard.Header
        avatar={
          <TasksCard.HeaderAvatar
            style={{
              color: "#ff9800",
              background: "#ffeccf",
            }}
            aria-label="tasks"
          >
            <Icon path={mdiStarHalf} size={1} />
          </TasksCard.HeaderAvatar>
        }
        title={
          <TasksCard.HeaderTitle>{t("TIN NỔI BẬT")}</TasksCard.HeaderTitle>
        }
      />
      <Box borderBottom="1px solid rgba(0, 0, 0, 0.12)"></Box>
      <TasksCard.Content>
        <Stack small>
          {
            // new Array(5)
            //   .fill({
            //     id: "5e7b2e9bf1e7e4730a61fb74",
            //     title: "Thông báo cả làng làm việc ở nhà",
            //     user_create_avatar:
            //       "https://storage.googleapis.com/storage_vtask_net/1583571954197-filename",
            //     user_create_name: "Thành Nguyễn",
            //     category_name: "Sự kiện",
            //     created_at: "17:12 25/03/2020",
            //   })
            posts.map((item, i) => {
              return (
                <ListItemLayout
                  key={i}
                  left={<Avatar src={item.user_create_avatar}></Avatar>}
                  title={
                    <span
                      className="cursor-pointer"
                      onClick={() =>
                        history.push(
                          routes.postDetail.path.replace(":id", item.id)
                        )
                      }
                    >
                      {item.title}
                    </span>
                  }
                  subTitle={
                    <span
                      onClick={() => {
                        history.push(
                          routes.category.path.replace(":id", item.category_id)
                        );
                      }}
                    >
                      <StyledTypo component="span" color="blue">
                        # {item.category_name}
                      </StyledTypo>{" "}
                      {item.created_at}
                    </span>
                  }
                ></ListItemLayout>
              );
            })
          }
          {posts.length === 0 && (
            <EmptyHolder title={"Không tìm thấy bài post nào"} description="" />
          )}
          <div>
            <ButtonBase style={{ float: "right" }}>
              <StyledTypo component="span" color="blue">
                {t("Xem thêm")}
              </StyledTypo>
            </ButtonBase>
          </div>
        </Stack>
      </TasksCard.Content>
    </TasksCard.Container>
  );
};
export default (props) => {
  const dispatch = useDispatch();
  const posts = useSelector(postModule.selectors.highLightPostListSelector);
  useEffect(() => {
    dispatch(postModule.actions.loadPostHighLightList());
  }, [dispatch]);
  return <HightLight posts={posts} {...props} />;
};
