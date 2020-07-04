import { Avatar, Box, Chip, IconButton } from "@material-ui/core";
import { AttachFile, Close, Image } from "@material-ui/icons";
import classnames from "classnames";
import { Field, Formik, useField } from "formik";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Scrollbars from "react-custom-scrollbars";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useToggle } from "react-use";
import SendFileModal from "views/JobDetailPage/ChatComponent/SendFile/SendFileModal";
import { emptyArray, emptyObject } from "views/JobPage/contants/defaultValue";
import { uniqueId } from "views/JobPage/utils";
import { loginlineParams } from "views/OfferPage/utils";
import TasksScrollbar from "views/SettingGroupPage/GroupPermissionSettings/components/TasksScrollbar";
import AddButton from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/AddButton";
import { ChipGroup } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/ChipGroup";
import CssFormControl, {
  BindedCssFormControl,
  InputFormControl,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/CssFormControl";
import { DraggableList } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/DraggableList";
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

const setFileIds = (files) => {
  new Array(files.length).fill(true).forEach((file, i) => {
    files[i].id = uniqueId("file_");
    files[i].notUploaded = true;
  });
};

const ImageListField = ({
  name,
  placeholder = "Thả file, hình ảnh vào đây...",
}) => {
  const [field] = useField({ name });
  const [fieldOrder] = useField({ name: `${name}_order` });
  const handleChange = (files = []) => {
    setFileIds(files);
    field.onChange({
      target: {
        name,
        value: [...(field.value || emptyArray), ...files],
      },
    });
    field.onChange({
      target: {
        name: `${name}_order`,
        value: [
          ...(fieldOrder.value || emptyArray),
          ...[...files].map((file) => file.id),
        ],
      },
    });
  };

  const { list, showEmpty } = useMemo(() => {
    const fileFiltered = (field.value || emptyArray).filter(isFileImage);
    const showEmpty = !fileFiltered.length;
    const list = fileFiltered.map((item, i) => ({ item, index: "" + item.id }));
    return { showEmpty, list };
  }, [field.value]);
  return (
    <DropZone onChange={handleChange}>
      {(getRootProps, getInputProps, isDragActive) => {
        // if (!isDragActive && showEmpty) return null;
        return (
          <div
            className={classnames(classes.media, {
              isDragActive: isDragActive,
            })}
          >
            {!isDragActive && !showEmpty && (
              <DraggableList
                direction="horizontal"
                onChange={(orderList = emptyArray) => {
                  console.log({ orderList });
                  fieldOrder.onChange({
                    target: {
                      name: `${name}_order`,
                      value: orderList,
                      // .reduce((result, v, i) => {
                      //   result[v] = i;
                      //   return result;
                      // }, {}),
                    },
                  });
                }}
                renderListWrapper={(children) => (
                  <Scrollbars
                    style={{ height: "140px" ,zIndex:1}}
                    renderView={(props) => (
                      <div
                        {...props}
                        className="comp_PostCreatorPopupInner__mediaList"
                      />
                    )}
                  >
                    {children}
                  </Scrollbars>
                )}
                list={list}
                getId={(item) => item.index}
              >
                {({ item, index }, bindDraggable, bindDragHandle) => {
                  console.log({ item });
                  return bindDraggable(
                    bindDragHandle(
                      <div className="comp_PostCreatorPopupInner__mediaItem">
                        <ImagePreview
                          file={item}
                          onDelete={() => {
                            const newImage = [...field.value];
                            const index = newImage.findIndex(
                              (file) => file.id === item.id
                            );
                            newImage.splice(index, 1);
                            field.onChange({
                              target: {
                                name,
                                value: newImage,
                              },
                            });
                          }}
                        ></ImagePreview>
                      </div>
                    )
                  );
                }}
              </DraggableList>
            )}
            {isDragActive && placeholder}
            <div
              {...getRootProps()}
              style={{
                zIndex: isDragActive ? "1" : "-1",
                display: true ? "block" : "none",
                position: "fixed",
                top: 0,
                left: 0,
                width: "100vw",
                height: "100vh",
              }}
            ></div>
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
  const [fieldOrder] = useField({ name: `${name}_order` });
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
          setFileIds(e.target.files);
          console.log("file", e.target.files);
          field.onChange({
            target: {
              name,
              value: [...(field.value || emptyArray), ...e.target.files],
            },
          });
          field.onChange({
            target: {
              name: `${name}_order`,
              value: [
                ...(fieldOrder.value || emptyArray),
                ...[...e.target.files].map((file) => file.id),
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
                        onClick={() => {}}
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
    if (file.url_thumb || file.url) {
      setSrc(file.url_thumb || file.url);
    } else {
      var reader = new FileReader();
      reader.onload = function (e) {
        setSrc(e.target.result);
      };
      reader.readAsDataURL(file);
    }
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
  const acceptedImageTypes = [
    "image/gif",
    "image/jpeg",
    "image/png",
    "gif",
    "jpeg",
    "jpg",
    "png",
  ];
  return file && acceptedImageTypes.includes(file["type"]);
}
const DropZone = ({ onChange, children }) => {
  const [isDragActive, setIsDragActive] = useState();
  const onDrop = useCallback(
    async (files = []) => {
      onChange(files);
    },
    [onChange]
  );
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  useEffect(() => {
    const handleDragEnter = (e) => {
      setIsDragActive(true);
    };
    const handleDragLeave = (e) => {
      setIsDragActive(false);
    };
    const element = document.querySelector("#PostCreator");
    element.addEventListener("dragenter", handleDragEnter, true);
    element.addEventListener("mouseover", handleDragLeave, true);
    element.addEventListener("drop", handleDragLeave, true);
    return () => {
      element.removeEventListener("mouseover", handleDragEnter, true);
      element.removeEventListener("mouseover", handleDragLeave, true);
      element.removeEventListener("drop", handleDragLeave, true);
    };
  }, []);
  console.log({ isDragActive });
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
export const PostCreatorPopupInner = ({
  title = "Tạo bài viết trên bảng tin nội bộ",
  onClose,
  categories,
  loading,
}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState();
  return (
    <>
      <TasksCard.Container className={classes.root}>
        <div className={classes.header}>
          <div className={classes.headerTitle}>{t(title)}</div>
          <IconButton onClick={onClose} size="small">
            <Close />
          </IconButton>
        </div>
        <Box>
          <TasksScrollbar>
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
                        label: t("Tiêu đề bài viết") + "...",
                      }}
                    />
                    <InputFormControl
                      name="content"
                      inputProps={{
                        variant: "standard",
                        className: classes.content,
                        size: "medium",
                        rows: 5,
                        multiline: true,
                        label: t("Nội dung bài viết") + "...",
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
          </TasksScrollbar>
        </Box>
        <div className={classes.footer}>
          <IconButton onClick={() => setOpen(true)}>
            <label>
              <AttachFile className="comp_PostCreatorPopupInner__fileIcon" />
            </label>
          </IconButton>
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
      <ModalFileInput name="file" open={open} setOpen={setOpen} />
    </>
  );
};
const ModalFileInput = ({ name, open, setOpen }) => {
  const [field] = useField({ name });
  const [fieldOrder] = useField({ name: `${name}_order` });
  const handleChange = (files = []) => {
    field.onChange({
      target: {
        name,
        value: [...(field.value || emptyArray), ...files],
      },
    });
    field.onChange({
      target: {
        name: `${name}_order`,
        value: [
          ...(fieldOrder.value || emptyArray),
          ...[...files].map((file) => file.id),
        ],
      },
    });
    setOpen(false);
  };
  return (
    <SendFileModal
      open={open}
      setOpen={setOpen}
      handleUploadFile={(e) => {
        setFileIds(e.target.files);
        handleChange(e.target.files);
      }}
      onConfirmShare={handleChange}
    />
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
        const { file_order = [] } = values;
        const finalValues = { ...values };
        finalValues.file = finalValues.file || [];
        const isFileFromStore = (file) => !!file.id;
        const isFileFromGoggle = (file) => !!file.file_id;
        const { file_ids, file, google_data } = finalValues.file.reduce(
          (result, f, i) => {
            switch (true) {
              case f.notUploaded:
                result.file.push(f);
                break;
              case isFileFromStore(f):
                result.file_ids.push(f.id);
                break;
              case isFileFromGoggle(f):
                result.google_data.push(f);
                break;
              default:
                result.file.push(f);
                break;
            }
            return result;
          },
          {
            file_ids: [],
            file: [],
            google_data: [],
          }
        );
        // const getOrder = (f) => file_order[f.id];
        // const orderedFiles = sortBy(file, loginlineFunc(getOrder));
        // console.log({ file_order, orderedFiles });
        const action = postModule.actions.createPost(
          loginlineParams({
            ...finalValues,
            file_ids,
            file,
            google_data,
            file_order: JSON.stringify(
              file_order
                .map((value) => {
                  let index = file.findIndex((item) => {
                    return item.id === value;
                  });
                  if (index >= 0) return "file_" + index;
                  if (index < 0) {
                    index = file_ids.findIndex((id) => {
                      return id === value;
                    });
                    if (index >= 0) return value;
                  }

                  return undefined;
                })
                .filter((item) => item)
            ),
          })
        );
        setAsyncAction(action);
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
