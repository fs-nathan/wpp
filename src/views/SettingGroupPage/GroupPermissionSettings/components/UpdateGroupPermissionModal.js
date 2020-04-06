import Joi from "@hapi/joi";
import { Formik } from "formik";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { GroupPermissionSettingsCotnext } from "..";
import { SetPermissionModal } from "./SetPermissionModal";

const addGroupPermissionFormInitialValues = { name: "", description: "" };

const createValidate = (schema) => (values = {}, mapError = {}) => {
  const { error } = schema.validate(values);
  return error
    ? error.details.reduce((result, error) => {
        result[error.context.key] = mapError[error.type] || error.type;
        return result;
      }, {})
    : emptyObject;
};
const validateUpdateGroupPermissionForm = createValidate(
  Joi.object({
    name: Joi.string().required(),
    logo: Joi.any(),
    logoPreview: Joi.any(),
    description: Joi.any(),
  })
);
const UpdateGroupPermissionForm = ({ children, onSubmit }) => {
  // error.details[0].type
  const { t } = useTranslation();
  const validateMemo = useMemo(
    () => (values = {}) => {
      const mapError = { "string.empty": t("required") };
      return validateUpdateGroupPermissionForm(values, mapError);
    },
    [t]
  );
  return (
    <Formik
      initialValues={addGroupPermissionFormInitialValues}
      onSubmit={onSubmit}
      validate={validateMemo}
    >
      {children}
    </Formik>
  );
};
export default () => {
  const [step, setStep] = useState(0); //0,1
  const { setModal } = useContext(GroupPermissionSettingsCotnext);
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);
  useEffect(() => {
    status === apiCallStatus.success && onClose();
  }, [onClose, status]);
  const handleSubmit = (values) => setModal(null);

  return (
    <UpdateGroupPermissionForm onSubmit={handleSubmit}>
      <SetPermissionModal
        loading={status === apiCallStatus.loading}
        onClose={onClose}
      />
    </UpdateGroupPermissionForm>
  );
};
