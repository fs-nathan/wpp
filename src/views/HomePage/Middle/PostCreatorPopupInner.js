import { Box, Button, IconButton, TextField } from "@material-ui/core";
import { AttachFile, Close, Image } from "@material-ui/icons";
import { Formik } from "formik";
import React from "react";
import { useTranslation } from "react-i18next";
import { loginlineParams } from "views/JobPage/utils";
import { SelecIconInputFormControl } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/CssFormControl";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import TasksCard from "../components/TasksCard";
import "./PostCreatorPopupInner.css";
const classes = {
  root: "comp_PostCreatorPopupInner",
  header: "comp_PostCreatorPopupInner__header",
  main: "comp_PostCreatorPopupInner__main",
  headerTitle: "comp_PostCreatorPopupInner__headerTitle",
  title: "comp_PostCreatorPopupInner__title",
  content: "comp_PostCreatorPopupInner__content",
  media: "comp_PostCreatorPopupInner__media",
  mediaCloseButton: "comp_PostCreatorPopupInner__mediaCloseButton",
  footer: "comp_PostCreatorPopupInner__footer",
};
export const PostCreatorPopupInner = ({ onClose }) => {
  const { t } = useTranslation();
  return (
    <Formik initialValues={{}}>
      <TasksCard.Container className={classes.root}>
        <Box
          className={classes.header}
          padding="8px 8px 8px 16px"
          fontWeight="bold"
          display="flex"
          alignItems="center"
          style={{
            background: "#f5f6f7",
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
        >
          <Box className={classes.headerTitle} flex="1">
            {t("Tạo bài viết trên bảng tin nội bộ")}
          </Box>
          <IconButton size="small">
            <Close />
          </IconButton>
        </Box>
        <div className={classes.main}>
          <TasksCard.Content>
            <Stack large>
              <TextField
                className={classes.title}
                size="medium"
                style={{ fontSize: "20px" }}
                id="title"
                multiline
                label={t("Tiêu đề bài viết...")}
              />
              <TextField
                className={classes.content}
                style={{ fontSize: "15px" }}
                multiline
                rows="3"
                id="content"
                label={"Nội dung bài viết..."}
              />
              <SelecIconInputFormControl
                name="category"
                onClick={loginlineParams}
                label={t("Chọn thẻ muốn đăng")}
                addLabel={t("Chọn thẻ")}
              ></SelecIconInputFormControl>
              <SelecIconInputFormControl
                name="file"
                onClick={loginlineParams}
                label={t("Tài liệu đính kèm")}
                addLabel={t("upload tài liệu")}
              ></SelecIconInputFormControl>
            </Stack>
          </TasksCard.Content>
          <div className={classes.media}>
            <div>
              {new Array(6).fill(true).map((item, i) => (
                <div key={i}>
                  <img src="https://appapi.workplus.vn/images_default/cover.png" />
                  <IconButton className={classes.mediaCloseButton} size="small">
                    <Close />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Box className={classes.footer} padding="10px" display="flex">
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <Image />
          </IconButton>
          <Box flex="1" />
          <Button className="common-btn-modal">{t("Đăng bài")}</Button>
        </Box>
      </TasksCard.Container>
    </Formik>
  );
};
