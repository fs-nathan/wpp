import Joi from "@hapi/joi";
import { Box, TableCell } from "@material-ui/core";
import { Formik, FormikContext } from "formik";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { DialogContent } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import VerticleList from "views/JobPage/components/VerticleList";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import {
  createMapPropsFromAttrs,
  get,
  loginlineFunc,
  loginlineParams,
} from "views/JobPage/utils";
import {
  InputFormControl,
  MultilineInputFormControl,
  RadioGroupFormControl,
} from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/components/CssFormControl";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { GroupPermissionSettingsCotnext } from "..";
import { permissionModulesAttr } from "../contants";
import { settingGroupPermission } from "../redux";
import UpdateGroupPermissionModal from "./UpdateGroupPermissionModal";
export const CustomTableBodyCell = styled(TableCell)`
  border-bottom: none;
`;
const AddGroupPermissionModal = ({
  loading,
  permissionModules = [],
  onClose,
}) => {
  const { handleSubmit } = useContext(FormikContext);
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
            <RadioGroupFormControl
              options={permissionModules.map((item) => {
                const [name, value] = createMapPropsFromAttrs([
                  permissionModulesAttr.name,
                  permissionModulesAttr.value,
                ])(item);
                return {
                  label: name,
                  name,
                  value,
                };
              })}
              name="type"
              label={t("Phạm vi module phân quyền")}
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
    description: Joi.any(),
    type: Joi.any(),
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
  const dispath = useDispatch();
  const { setModal } = useContext(GroupPermissionSettingsCotnext);
  const [{ status, data }, setAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);
  useEffect(() => {
    dispath(settingGroupPermission.actions.loadGroupModules());
  }, [dispath]);
  useEffect(() => {
    if (status === apiCallStatus.success) {
      setModal(
        <UpdateGroupPermissionModal
          item={loginlineFunc(get)(loginlineParams(data), "group_permission")}
        />
      );
    }
  }, [data, setModal, status]);
  const handleSubmit = (values) =>
    setAsyncAction(
      settingGroupPermission.actions.createGroupPermission(values)
    );
  const permissionModules = useSelector(
    settingGroupPermission.selectors.groupModulesListSelector
  );

  return (
    <AddGroupPermissionForm onSubmit={handleSubmit}>
      <AddGroupPermissionModal
        permissionModules={permissionModules}
        loading={status === apiCallStatus.loading}
        onClose={onClose}
      />
    </AddGroupPermissionForm>
  );
};
