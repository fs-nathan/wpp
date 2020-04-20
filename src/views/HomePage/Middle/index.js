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
import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { createMapPropsFromAttrs, template } from "views/JobPage/utils";
import { ChipGroup } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ChipGroup";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { categoryAttr } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/contants";
import { categoryListSelector } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import SelectCategoryModal from "../components/SelectCategoryModal";
import TasksCard from "../components/TasksCard";
import PostCreatorPopupInner from "./PostCreatorPopupInner";
import PostList from "./PostList";
const PostCreator = () => {
  const { t } = useTranslation();
  const [modal, setModal] = useState();
  const categories = useSelector(categoryListSelector);
  const handleClose = useCallback(() => {
    setModal(null);
  }, []);
  const handleOpenPostCreatorPopup = useCallback(
    (cate) => {
      setModal(
        <Dialog
          onClose={handleClose}
          fullWidth={true}
          maxWidth={"sm"}
          open={true}
        >
          <PostCreatorPopupInner onClose={handleClose} category={cate} />
        </Dialog>
      );
    },
    [handleClose]
  );
  const handleOpenSelectCategoryModal = useCallback(() => {
    setModal(
      <SelectCategoryModal
        categories={categories}
        onItemClick={handleOpenPostCreatorPopup}
        onClose={handleClose}
      />
    );
  }, [categories, handleClose, handleOpenPostCreatorPopup]);
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
            <Box padding="16px" onClick={() => handleOpenPostCreatorPopup()}>
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
              {categories.map((cate) => {
                const [id, name, logo] = createMapPropsFromAttrs([
                  categoryAttr.id,
                  categoryAttr.name,
                  categoryAttr.logo,
                ])(cate);
                return (
                  <Chip
                    onClick={() => handleOpenPostCreatorPopup(cate)}
                    key={id}
                    avatar={<Avatar alt={name} src={logo} />}
                    label={name}
                  />
                );
              })}
              <Box flex={1}></Box>
              <ButtonBase
                onClick={handleOpenSelectCategoryModal}
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

      {modal}
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
      <TasksCard.Container>
        {/* <NewsItem /> */}
        {/* <RemindItem /> */}
      </TasksCard.Container>
    </Stack>
  );
}

export default Middle;
