import Joi from "@hapi/joi";
import { Box } from "@material-ui/core";
import { listIcon } from "actions/icon/listIcon";
import { Field, Formik, FormikContext } from "formik";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useToggle } from "react-use";
import LogoManager from "views/DepartmentPage/Modals/LogoManager";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { DialogContent } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import VerticleList from "views/JobPage/components/VerticleList";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import HomeContext from "../HomeContext";
import { createPostCategory } from "../redux";
import { apiCallStatus } from "../redux/apiCall/types";
import useAsyncTracker from "../redux/apiCall/useAsyncTracker";
import {
  InputFormControl,
  MultilineInputFormControl,
  SelecIconInputFormControl,
} from "./CssFormControl";
export const CategoryModal = ({
  title = "Tạo thể loại",
  loading,
  onClose,
  toggleLogoModal,
}) => {
  const { t } = useTranslation();
  const { handleSubmit } = useContext(FormikContext);
  return (
    <ModalCommon
      loading={loading}
      title={t(title)}
      onClose={onClose}
      footerAction={[
        {
          action: handleSubmit,
          name: t("Hoàn thành"),
        },
      ]}
    >
      <DialogContent dividers className="dialog-content move-content">
        <Box padding="24px">
          <VerticleList>
            <InputFormControl name="name" label={t("Tên thể loại")} />
            <MultilineInputFormControl
              name="description"
              label={t("Mô tả chi tiết")}
            />
            <SelecIconInputFormControl
              name="logoPreview"
              onClick={toggleLogoModal}
              label={t("Biểu tượng")}
              addLabel={t("Chọn biểu tượng")}
            ></SelecIconInputFormControl>
          </VerticleList>
        </Box>
      </DialogContent>
    </ModalCommon>
  );
};
const LogoManagerModal = (props) => {
  const dispath = useDispatch();
  useEffect(() => {
    dispath(listIcon());
  }, [dispath]);
  return <LogoManager {...props} />;
};
const addCategoryFormInitialValues = { name: "", description: "", logo: "" };

const createValidate = (schema) => (values = {}, mapError = {}) => {
  const { error } = schema.validate(values);
  return error
    ? error.details.reduce((result, error) => {
        result[error.context.key] = mapError[error.type] || error.type;
        return result;
      }, {})
    : emptyObject;
};
const validateAddCategoryForm = createValidate(
  Joi.object({
    name: Joi.string().required(),
    logo: Joi.any(),
    logoPreview: Joi.any(),
    description: Joi.any(),
  })
);
const AddCategoryForm = ({ children, onSubmit }) => {
  // error.details[0].type
  const { t } = useTranslation();
  const validateMemo = useMemo(
    () => (values = {}) => {
      const mapError = { "string.empty": t("required") };
      return validateAddCategoryForm(values, mapError);
    },
    [t]
  );
  return (
    <Formik
      initialValues={addCategoryFormInitialValues}
      onSubmit={onSubmit}
      validate={validateMemo}
    >
      {children}
    </Formik>
  );
};
export default () => {
  const { setModal } = useContext(HomeContext);
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);
  useEffect(() => {
    status === apiCallStatus.success && onClose();
  }, [onClose, status]);
  const [openLogoModal, toggleLogoModal] = useToggle();
  const handleSubmit = (values) => setAsyncAction(createPostCategory(values));
  return (
    <AddCategoryForm onSubmit={handleSubmit}>
      <>
        <CategoryModal
          loading={status === apiCallStatus.loading}
          onClose={onClose}
          toggleLogoModal={toggleLogoModal}
        />
        {openLogoModal && (
          <Field name="logo">
            {({ field }) => (
              <LogoManagerModal
                open={openLogoModal}
                setOpen={toggleLogoModal}
                doSelectIcon={(value) => {
                  field.onChange({
                    target: {
                      name: "logo",
                      value: value.url_sort,
                    },
                  });
                  field.onChange({
                    target: {
                      name: "logoPreview",
                      value: value.url_full,
                    },
                  });
                  toggleLogoModal(false);
                }}
              />
            )}
          </Field>
        )}
      </>
    </AddCategoryForm>
  );
};
