import React, { useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { categoryListSelector } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { postModule } from "../redux/post";
import {
  PostCreatorForm,
  PostCreatorPopupInner,
} from "./PostCreatorPopupInner";

export default function PostEditor({ onClose, post }) {
  const [{ status, data }, setAsyncAction] = useAsyncTracker();
  const categories = useSelector(categoryListSelector);
  const initialValues = useMemo(() => {
    const {
      id,
      title,
      content,
      category_id,
      files = emptyArray,
      images = emptyArray,
    } = post;
    return {
      id,
      title: title,
      content: content,
      file: [
        ...files.map((f) => ({ ...f, name: f.url.split("-")[1] })),
        ...images,
      ],
      category: category_id,
    };
  }, [post]);
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
        finalValues.file = finalValues.file || [];
        const isFileFromStore = (file) => !!file.id;
        const isFileFromGoggle = (file) => !!file.file_id;
        const { file_ids, file, google_data } = finalValues.file.reduce(
          (result, f) => {
            switch (true) {
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

        setAsyncAction(
          postModule.actions.updatePost({
            ...finalValues,
            file_ids,
            file,
            google_data,
          })
        );
      }}
    >
      <PostCreatorPopupInner
        categories={categories}
        onClose={onClose}
        loading={status === apiCallStatus.loading}
      ></PostCreatorPopupInner>
    </PostCreatorForm>
  );
}
