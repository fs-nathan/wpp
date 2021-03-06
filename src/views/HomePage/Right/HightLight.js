/* eslint-disable import/no-anonymous-default-export */
import { Avatar, Box, ButtonBase } from "@material-ui/core";
import { mdiStarHalf } from "@mdi/js";
import Icon from "@mdi/react";
import StyledTypo from "components/ColorTypo";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { useToggle } from "react-use";
import EmptyHolder from "views/JobPage/components/EmptyHolder";
import ListItemLayout from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ListItemLayout";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import { routes } from "../contant/routes";
import { postModule } from "../redux/post";

const HighlightItem = ({ item, history }) => (
  <ListItemLayout
    left={<Avatar src={item.user_create_avatar}></Avatar>}
    title={
      <span
        className="cursor-pointer u-link"
        onClick={() =>
          history.push(routes.postDetail.path.replace(":id", item.id))
        }
      >
        {item.title}
      </span>
    }
    subTitle={
      <span
        onClick={() => {
          history.push(routes.category.path.replace(":id", item.category_id));
        }}
      >
        <StyledTypo component="span" className="u-link u-colorBlue">
          # {item.category_name}
        </StyledTypo>{" "}
        {item.created_at}
      </span>
    }
  ></ListItemLayout>
);
export const HightLight = ({ posts, isToggle, onMoreClick }) => {
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
          <TasksCard.HeaderTitle>{t("TIN N???I B???T")}</TasksCard.HeaderTitle>
        }
      />
      <Box borderBottom="1px solid rgba(0, 0, 0, 0.12)"></Box>
      <TasksCard.Content>
        <Stack small>
          {posts.map((item, i) => {
            return (
              <HighlightItem key={i} {...{ item, history }}></HighlightItem>
            );
          })}
          {posts.length === 0 && (
            <EmptyHolder title={"Kh??ng t??m th???y b??i post n??o"} description="" />
          )}
          {!isToggle && (
            <div>
              <ButtonBase onClick={onMoreClick} style={{ float: "right" }}>
                <StyledTypo
                  className="u-fontSize12 u-colorBlue"
                  component="span"
                  color="blue"
                >
                  {t("Xem th??m")}
                </StyledTypo>
              </ButtonBase>
            </div>
          )}
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
  const [isToggle, toggle] = useToggle();
  const { t } = useTranslation();
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    toggle(false);
  }, [location, toggle]);
  return (
    <>
      {posts?.length > 0 ? (
        <HightLight
          posts={posts.filter((item, i) => isToggle || i < 3)}
          {...props}
          isToggle={posts.length <= 3 || isToggle}
          onMoreClick={() => toggle()}
        />
      ) : null}

      {/* {isToggle && (
        <Dialog
          onClose={() => toggle()}
          fullWidth={true}
          maxWidth={"md"}
          aria-labelledby="customized-dialog-title"
          open={true}
          className="modal-common-container"
        >
          <DialogTitleCus
            id="customized-dialog-title"
            onClose={() => toggle()}
            className="modal-cus"
          >
            {t("TIN N???I B???T")}
          </DialogTitleCus>
          <Box padding="20px">
            <Stack small>
              {posts.map((item, i) => {
                return (
                  <HighlightItem key={i} {...{ item, history }}></HighlightItem>
                );
              })}
              {posts.length === 0 && (
                <EmptyHolder
                  title={"Kh??ng t??m th???y b??i post n??o"}
                  description=""
                />
              )}
            </Stack>
          </Box>
          <DialogActions>
            <Button
              onClick={() => toggle()}
              disableRipple
              className="common-btn-modal"
            >
              {t("THO??T")}
            </Button>
          </DialogActions>
        </Dialog>
      )} */}
    </>
  );
};
