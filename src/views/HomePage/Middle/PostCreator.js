import { Avatar, Box, Chip, Dialog } from "@material-ui/core";
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
import "./PostCreator.css";
import PostCreatorPopupInner from "./PostCreatorPopupInner";
export const PostCreator = () => {
  const profile = useSelector((state) => state.system.profile);
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
          id="PostCreator"
          PaperProps={{
            tabIndex: -1,
          }}
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
      <div className="comp_PostCreator__header">{t("Tạo bài viết")}</div>
      <TasksCard.Content onClick={() => handleOpenPostCreatorPopup()}>
        <Stack>
          <div className="comp_PostCreator__profile">
            <Avatar
              className="comp_PostCreator__profileTitlte"
              src={profile.avatar}
            >
              A
            </Avatar>
            {template(t("<%= name %> ơi bạn muốn đăng gì"))({
              name: profile.name,
            })}
          </div>
          <div className="comp_PostCreator__categoryGroup">
            <ChipGroup>
              {categories.map((cate, i) => {
                if (i > 2) return null;
                const [id, name, logo] = createMapPropsFromAttrs([
                  categoryAttr.id,
                  categoryAttr.name,
                  categoryAttr.logo,
                ])(cate);
                return (
                  <Chip
                    className="comp_PostCreator__chip"
                    key={id}
                    avatar={<Avatar alt={name} src={logo} />}
                    label={name}
                  />
                );
              })}
              <Box flex={1}></Box>
              {/* <ButtonBase
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
              </ButtonBase> */}
            </ChipGroup>
          </div>
        </Stack>
      </TasksCard.Content>
      {modal}
    </TasksCard.Container>
  );
};
