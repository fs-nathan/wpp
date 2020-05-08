import { Avatar, Box, Chip, IconButton } from "@material-ui/core";
import { AttachFile, Close, Image } from "@material-ui/icons";
import classnames from "classnames";
import { Field, Formik, useField } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";
import { emptyArray, emptyObject } from "views/JobPage/contants/defaultValue";
import { get, loginlineParams, uniqueId } from "views/JobPage/utils";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import { ChipGroup } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ChipGroup";
import CssFormControl, {
  BindedCssFormControl,
  InputFormControl,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/CssFormControl";
import { Stack } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/Stack";
import { categoryListSelector } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { PrimarySubmitAction } from "../components/PrimarySubmitAction";
import SelectCategoryModal from "../components/SelectCategoryModal";
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

const ImageListField = ({
  name,
  placeholder = "Thả file, hình ảnh vào đây...",
}) => {
  const [field] = useField({ name });
  const handleChange = (files = []) => {
    loginlineParams(files);
    field.onChange({
      target: {
        name,
        value: [
          ...(loginlineParams(field.value) || emptyArray),
          ...loginlineParams(files),
        ],
      },
    });
  };
  const fileFiltered = get(field, "value", emptyArray).filter(isFileImage);
  const showEmpty = !(fileFiltered && fileFiltered.length);
  return (
    <DropZone onChange={handleChange}>
      {(getRootProps, getInputProps, isDragActive) => {
        return (
          <div
            className={classnames(classes.media, { showEmpty })}
            {...getRootProps()}
            tabIndex={undefined}
            onClick={() => {}}
          >
            {!showEmpty && (
              <div>
                {fileFiltered.map((item, i) => (
                  <ImagePreview
                    file={item}
                    key={i}
                    onDelete={() => {
                      const newImage = [...field.value];
                      newImage.splice(i, 1);
                      field.onChange({
                        target: {
                          name,
                          value: newImage,
                        },
                      });
                    }}
                  ></ImagePreview>
                ))}
              </div>
            )}
            {showEmpty && placeholder}
            <input {...getInputProps()} />
          </div>
        );
      }}
    </DropZone>
  );
};
const FileField = ({ name, id, children, ...props }) => {
  const [inputId] = useState(() => {
    return id || "FileField_" + uniqueId();
  });
  const [field, meta] = useField({ name });
  return (
    <>
      {children(inputId, field, meta)}
      <input
        hidden
        accept="*"
        id={inputId}
        type="file"
        multiple="multiple"
        onChange={(e) => {
          field.onChange({
            target: {
              name,
              value: [
                ...(loginlineParams(field.value) || emptyArray),
                ...loginlineParams(e.target.files),
              ],
            },
          });
        }}
        {...props}
      />
    </>
  );
};
const ImageField = (props) => <FileField accept="image/*" {...props} />;
const FilePreviewField = ({ name }) => {
  const { t } = useTranslation();

  return (
    <FileField name={name}>
      {(id, field, meta) => {
        const files = field.value || emptyArray;
        const error = meta.error;
        const fileFiltered = files.filter((file) => !isFileImage(file));
        if (!(fileFiltered && fileFiltered.length)) return null;
        return (
          <CssFormControl label={t("Tài liệu đính kèm")} errorMessage={error}>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              {
                <ChipGroup>
                  {files
                    .filter((file) => !isFileImage(file))
                    .map((file, i) => (
                      <Chip
                        className="comp_PostCreator__chip"
                        label={file.name}
                        onDelete={() => {
                          const newValue = [...files];
                          newValue[i] = undefined;
                          field.onChange({
                            target: {
                              name: name,
                              value: newValue.filter((item) => item),
                            },
                          });
                        }}
                      />
                    ))}
                  {id && (
                    <label htmlFor={id}>
                      <AddButton
                        onClick={loginlineParams}
                        label={t("Thêm tài liệu")}
                      ></AddButton>
                    </label>
                  )}
                </ChipGroup>
              }
            </Box>
          </CssFormControl>
        );
      }}
    </FileField>
  );
};
const ImagePreview = ({ file, onDelete }) => {
  console.log(file);
  const [src, setSrc] = useState();
  useEffect(() => {
    var reader = new FileReader();
    reader.onload = function (e) {
      setSrc(e.target.result);
    };
    reader.readAsDataURL(file);
  }, [file]);
  return (
    <div>
      {src && <img src={src} />}
      <IconButton
        onClick={onDelete}
        className={classes.mediaCloseButton}
        size="small"
      >
        <Close />
      </IconButton>
    </div>
  );
};
function isFileImage(file) {
  return file && file["type"].split("/")[0] === "image";
}
const DropZone = ({ onChange, children }) => {
  const onDrop = useCallback(
    async (files = []) => {
      onChange(files);
    },
    [onChange]
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  return children(getRootProps, getInputProps, isDragActive);
};
const SelectCategoryModalField = ({ onClose, name }) => (
  <Field name={name}>
    {({ field }) => (
      <SelectCategoryModal
        {...{
          onItemClick: (cate) => {
            field.onChange({
              target: {
                name: name,
                value: cate.id,
              },
            });
            onClose();
          },
          onClose: onClose,
        }}
      ></SelectCategoryModal>
    )}
  </Field>
);
const CategoryField = ({ name, categories }) => {
  const [isToggleCatagoryModal, toggleCatagoryModal] = useToggle();
  const { t } = useTranslation();
  return (
    <BindedCssFormControl name={name} label={t("Chọn thể loại muốn đăng")}>
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
                  className="comp_PostCreator__chip"
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
            {isToggleCatagoryModal && (
              <SelectCategoryModalField
                name={name}
                onClose={toggleCatagoryModal}
              ></SelectCategoryModalField>
            )}
          </Box>
        );
      }}
    </BindedCssFormControl>
  );
};
export const PostCreatorPopupInner = ({ onClose, categories, loading }) => {
  const { t } = useTranslation();
  return (
    <TasksCard.Container className={classes.root}>
      <div className={classes.header}>
        <div className={classes.headerTitle}>
          {t("Tạo bài viết trên bảng tin nội bộ")}
        </div>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </div>
      <div className={classes.main}>
        <TasksCard.Content>
          <Stack large>
            <div>
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
            </div>
            <CategoryField name="category" categories={categories} />
            <FilePreviewField name="file" />
          </Stack>
        </TasksCard.Content>
        <ImageListField
          name="file"
          placeholder={t("Thả file, hình ảnh vào đây...")}
        />
      </div>
      <div className={classes.footer}>
        <FileField name="file">
          {(id) => (
            <IconButton>
              <label htmlFor={id}>
                <AttachFile />
              </label>
            </IconButton>
          )}
        </FileField>
        <ImageField name="file">
          {(id) => (
            <IconButton>
              <label htmlFor={id}>
                <Image />
              </label>
            </IconButton>
          )}
        </ImageField>
        <Box flex="1" />
        <PrimarySubmitAction loading={loading}>
          {t("Đăng bài")}
        </PrimarySubmitAction>
      </div>
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
      // validate={validateMemo}
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
      onSubmit={(values) => {
        const finalValues = { ...values };
        // finalValues.file = finalValues.file || [];
        // if (finalValues.image && finalValues.image.length) {
        //   finalValues.file = [...finalValues.file, ...finalValues.image];
        // }
        setAsyncAction(postModule.actions.createPost(finalValues));
      }}
    >
      <PostCreatorPopupInner
        categories={categories}
        onClose={onClose}
        loading={status === apiCallStatus.loading}
      ></PostCreatorPopupInner>
    </PostCreatorForm>
  );
};
