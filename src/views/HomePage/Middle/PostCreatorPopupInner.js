import {
  Avatar,
  Box,
  Chip,
  Dialog,
  DialogTitle,
  IconButton,
  List,
  ListItem,
} from "@material-ui/core";
import { AttachFile, Close, Image } from "@material-ui/icons";
import { Field, Formik, FormikContext } from "formik";
import React, { useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";
import { emptyArray, emptyObject } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs, loginlineParams } from "views/JobPage/utils";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import { ChipGroup } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ChipGroup";
import {
  BindedCssFormControl,
  InputFormControl,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/CssFormControl";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { categoryAttr } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/contants";
import { categoryListSelector } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { PrimarySubmitAction } from "../components/PrimarySubmitAction";
import TasksCard from "../components/TasksCard";
import { postModule } from "../redux/post";
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

export const PostCreatorPopupInner = ({ onClose, categories, loading }) => {
  const { t } = useTranslation();
  const [isToggleCatagoryModal, toggleCatagoryModal] = useToggle();
  const { values } = useContext(FormikContext);
  return (
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
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </Box>
      <div className={classes.main}>
        <TasksCard.Content>
          <Stack large>
            <InputFormControl
              name="title"
              inputProps={{
                error: false,
                variant: "standard",
                className: classes.title,
                size: "medium",
                multiline: true,
                label: t("Tiêu đề bài viết..."),
              }}
            />
            <InputFormControl
              name="content"
              inputProps={{
                variant: "standard",
                className: classes.content,
                size: "medium",
                rows: 3,
                multiline: true,
                label: t("Nội dung bài viết..."),
              }}
            />
            <BindedCssFormControl
              name="category"
              label={t("Chọn thể loại muốn đăng")}
            >
              {(field) => {
                const cate = categories.find((item) => field.value === item.id);
                return (
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <ChipGroup>
                      {cate && (
                        <Chip
                          avatar={<Avatar alt={cate.name} src={cate.logo} />}
                          label={cate.name}
                        />
                      )}
                      {cate ? (
                        <AddButton
                          onClick={toggleCatagoryModal}
                          label={t("Chọn thể loại khác")}
                        ></AddButton>
                      ) : (
                        <AddButton
                          onClick={toggleCatagoryModal}
                          label={t("Chọn thể loại")}
                        ></AddButton>
                      )}
                    </ChipGroup>
                  </Box>
                );
              }}
            </BindedCssFormControl>
            {!!values.file && values.file.length && (
              <BindedCssFormControl name="file" label={t("Tài liệu đính kèm")}>
                {(field) => {
                  const files = field.value || emptyArray;
                  return (
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      {
                        <ChipGroup>
                          {files &&
                            files.map((file, i) => (
                              <Chip
                                label={file.name}
                                onDelete={() => {
                                  const newValue = [...files];
                                  newValue[i] = undefined;
                                  field.onChange({
                                    target: {
                                      name: "file",
                                      value: newValue.filter((item) => item),
                                    },
                                  });
                                }}
                              />
                            ))}
                          <label htmlFor="raised-button-file">
                            <AddButton
                              onClick={loginlineParams}
                              label={t("Thêm tài liệu")}
                            ></AddButton>
                          </label>
                        </ChipGroup>
                      }
                    </Box>
                  );
                }}
              </BindedCssFormControl>
            )}
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
          <label htmlFor="raised-button-file">
            <AttachFile />
          </label>
        </IconButton>
        <Field name="file">
          {({ field }) => (
            <input
              hidden
              accept="*"
              id="raised-button-file"
              type="file"
              multiple
              onChange={(e) => {
                field.onChange({
                  target: {
                    name: "file",
                    value: [
                      ...(field.value || emptyArray),
                      ...loginlineParams(e.target.files),
                    ],
                  },
                });
              }}
            />
          )}
        </Field>
        <IconButton>
          <Image />
        </IconButton>
        <Box flex="1" />
        <PrimarySubmitAction loading={loading}>
          {t("Đăng bài")}
        </PrimarySubmitAction>
      </Box>
      <Field name="category">
        {({ field }) => (
          <Dialog
            onClose={toggleCatagoryModal}
            aria-labelledby="simple-dialog-title"
            open={isToggleCatagoryModal}
          >
            <DialogTitle>{t("Chọn thể loại")}</DialogTitle>
            <List>
              {categories.map((cate) => {
                const [id, name, logo] = createMapPropsFromAttrs([
                  categoryAttr.id,
                  categoryAttr.name,
                  categoryAttr.logo,
                ])(cate);
                return (
                  <ListItem
                    key={id}
                    button
                    onClick={() => {
                      field.onChange({
                        target: {
                          name: "category",
                          value: id,
                        },
                      });
                      toggleCatagoryModal();
                    }}
                  >
                    <Chip
                      avatar={<Avatar alt={name} src={logo} />}
                      label={name}
                    />
                  </ListItem>
                );
              })}
            </List>
          </Dialog>
        )}
      </Field>
    </TasksCard.Container>
  );
};

export const PostCreatorForm = ({ initialValues = emptyObject, ...props }) => {
  const { t } = useTranslation();
  const validateMemo = useMemo(
    () => (values = {}) => {
      const error = {};
      if (!values.title || !values.title.length) {
        error.title = t("required");
      }
      if (!values.category || !values.category.length) {
        error.category = t("required");
      }
      return error;
    },
    [t]
  );
  return (
    <Formik
      validate={validateMemo}
      enableReinitialize
      validateOnMount
      initialValues={initialValues}
      {...props}
    ></Formik>
  );
};
export default ({ onClose, category }) => {
  const [{ status, data }, setAsyncAction] = useAsyncTracker();
  const categories = useSelector(categoryListSelector);
  const initialValues = useMemo(() => {
    if (!category) return emptyObject;
    return {
      category: category.id,
    };
  }, [category]);
  useEffect(() => {
    if (status === apiCallStatus.success) {
      setTimeout(() => {
        onClose();
      }, 300);
    }
  }, [onClose, status]);
  return (
    <PostCreatorForm
      initialValues={initialValues}
      onSubmit={(values) =>
        setAsyncAction(postModule.actions.createPost(values))
      }
    >
      <PostCreatorPopupInner
        categories={categories}
        onClose={onClose}
        loading={status === apiCallStatus.loading}
      ></PostCreatorPopupInner>
    </PostCreatorForm>
  );
};
