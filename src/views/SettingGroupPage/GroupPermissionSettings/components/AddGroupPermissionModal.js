import Joi from "@hapi/joi";
import { Box, TableCell } from "@material-ui/core";
import { Formik } from "formik";
import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { DialogContent } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import VerticleList from "views/JobPage/components/VerticleList";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import {
  InputFormControl,
  MultilineInputFormControl,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/CssFormControl";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { GroupPermissionSettingsCotnext } from "..";
import { settingGroupPermission } from "../redux";
import { SetPermissionModal } from "./SetPermissionModal";
export const CustomTableBodyCell = styled(TableCell)`
  border-bottom: none;
`;
const AddGroupPermissionModal = ({ loading, handleSubmit, onClose }) => {
  const { t } = useTranslation();
  return (
    <ModalCommon
      loading={loading}
      title={t("Tạo nhóm quyền")}
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
            <InputFormControl name="name" label={t("Tên nhóm quyền")} />
            <MultilineInputFormControl
              name="description"
              label={t("Mô tả nhóm quyền")}
            />
          </VerticleList>
        </Box>
      </DialogContent>
    </ModalCommon>
  );
};
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
const validateAddGroupPermissionForm = createValidate(
  Joi.object({
    name: Joi.string().required(),
    logo: Joi.any(),
    logoPreview: Joi.any(),
    description: Joi.any(),
  })
);
const AddGroupPermissionForm = ({ children, onSubmit }) => {
  // error.details[0].type
  const { t } = useTranslation();
  const validateMemo = useMemo(
    () => (values = {}) => {
      const mapError = { "string.empty": t("required") };
      return validateAddGroupPermissionForm(values, mapError);
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
  const handleSubmit = (values) =>
    setAsyncAction(
      settingGroupPermission.actions.createGroupPermission(values)
    );
  return (
    <AddGroupPermissionForm onSubmit={handleSubmit}>
      <>
        {step === 0 && (
          <AddGroupPermissionModal
            handleSubmit={() => setStep(1)}
            loading={status === apiCallStatus.loading}
            onClose={onClose}
          />
        )}
        {step === 1 && (
          <SetPermissionModal
            loading={status === apiCallStatus.loading}
            onClose={onClose}
          />
        )}
      </>
    </AddGroupPermissionForm>
  );
};
