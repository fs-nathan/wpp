import Joi from "@hapi/joi";
import { Field, Formik } from "formik";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useToggle } from "react-use";
import LogoManagerModal from "views/DepartmentPage/Modals/LogoManager";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import HomeContext from "../HomeContext";
import { updatePostCategory } from "../redux";
import { apiCallStatus } from "../redux/apiCall/types";
import useAsyncTracker from "../redux/apiCall/useAsyncTracker";
import { CategoryModal } from "./AddCategotyModal";

const createValidate = (schema) => (values = {}, mapError = {}) => {
  const { error } = schema.validate(values);
  return error
    ? error.details.reduce((result, error) => {
        result[error.context.key] = mapError[error.type] || error.type;
        return result;
      }, {})
    : emptyObject;
};
const validateEditCategoryForm = createValidate(
  Joi.object({
    name: Joi.string().required(),
    logo: Joi.any(),
    logoPreview: Joi.any(),
    description: Joi.any(),
  })
);
const EditCategoryForm = ({
  initialValues = emptyObject,
  children,
  onSubmit,
}) => {
  // error.details[0].type
  const { t } = useTranslation();
  const validateMemo = useMemo(
    () => (values = {}) => {
      const mapError = { "string.empty": t("required") };
      return validateEditCategoryForm(values, mapError);
    },
    [t]
  );
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      // validate={validateMemo}
    >
      {children}
    </Formik>
  );
};
export default function EditCategorrModal({ id, logo, name, short_url }) {
  const { t } = useTranslation();
  const { setModal } = useContext(HomeContext);
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);
  useEffect(() => {
    status === apiCallStatus.success && onClose();
  }, [onClose, status]);
  const [openLogoModal, toggleLogoModal] = useToggle();
  const handleSubmit = (values) => setAsyncAction(updatePostCategory(values));
  return (
    <EditCategoryForm
      initialValues={{
        category_id: id,
        logoPreview: !!logo && logo,
        logo: short_url,
        name,
      }}
      onSubmit={handleSubmit}
    >
      <>
        <CategoryModal
          title={t("Sửa thể loại")}
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
    </EditCategoryForm>
  );
}
