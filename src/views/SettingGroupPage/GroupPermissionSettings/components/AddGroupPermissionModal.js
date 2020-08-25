import Joi from "@hapi/joi";
import { Box, TableCell } from "@material-ui/core";
import { bgColorSelector } from "components/LoadingOverlay/selectors";
import { Formik, FormikContext } from "formik";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import styled from "styled-components";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { DialogContent } from "views/DocumentPage/TablePart/DocumentComponent/TableCommon";
import VerticleList from "views/JobPage/components/VerticleList";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import {
  createMapPropsFromAttrs,
  createValidate,
  get,
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
export const GroupPermissionFormInner = ({
  disabled = {},
  permissionModules,
}) => {
  const { t } = useTranslation();
  return (
    <VerticleList>
      <InputFormControl required name="name" label={t("Tên nhóm quyền")} />
      <MultilineInputFormControl
        name="description"
        label={t("Mô tả nhóm quyền")}
      />
      <RadioGroupFormControl
        disabled={disabled.module}
        required
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
        name="module"
        label={t("Phạm vi module phân quyền")}
      />
    </VerticleList>
  );
};
export const GroupPermissionModal = ({
  loading,
  permissionModules = [],
  onClose,
}) => {
  const bgColor = useSelector(bgColorSelector);
  const { handleSubmit, isValid } = useContext(FormikContext);
  const { t } = useTranslation();
  return (
    <ModalCommon
      loading={loading}
      title={t("Tạo nhóm quyền")}
      onClose={onClose}
      footerAction={[
        {
          disabled: !isValid || loading,
          action: handleSubmit,
          name: t("Hoàn thành"),
        },
      ]}
    >
      <DialogContent dividers className="dialog-content move-content">
        <Box padding="24px">
          <GroupPermissionFormInner permissionModules={permissionModules} />
        </Box>
      </DialogContent>
    </ModalCommon>
  );
};
const addGroupPermissionFormInitialValues = {
  name: "",
  description: "",
  module: "",
};

const validateAddGroupPermissionForm = createValidate(
  Joi.object({
    name: Joi.string().required(),
    // description: Joi.string(),
    module: Joi.string().required(),
  })
);
export const GroupPermissionForm = ({
  children,
  initialValues = emptyObject,
  onSubmit,
}) => {
  // error.details[0].type
  const { t } = useTranslation();
  const validateMemo = useMemo(
    () => (values = {}) => {
      const mapError = {
        "name.string.empty": t("required"),
        // "module.string.empty": t("required"),
      };
      return validateAddGroupPermissionForm(values, mapError);
    },
    [t]
  );
  return (
    <Formik
      enableReinitialize
      // validateOnMount
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validateMemo}
    >
      {children}
    </Formik>
  );
};
export default () => {
  const { setModal, setSelect } = useContext(GroupPermissionSettingsCotnext);
  const [{ status, data }, setAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);

  useEffect(() => {
    if (status === apiCallStatus.success) {
      const item = get(data, "group_permission");
      setSelect(item);
      setModal(<UpdateGroupPermissionModal item={item} />);
    }
  }, [data, setModal, setSelect, status]);
  const handleSubmit = (values) =>
    setAsyncAction(
      settingGroupPermission.actions.createGroupPermission(values)
    );
  const permissionModules = useSelector(
    settingGroupPermission.selectors.groupModulesListSelector
  );

  return (
    <GroupPermissionForm
      initialValues={addGroupPermissionFormInitialValues}
      onSubmit={handleSubmit}
    >
      <GroupPermissionModal
        permissionModules={permissionModules}
        loading={status === apiCallStatus.loading}
        onClose={onClose}
      />
    </GroupPermissionForm>
  );
};
