import { Box, DialogContent, TableCell } from "@material-ui/core";
import { FormikContext } from "formik";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import ModalCommon from "views/DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { emptyArray } from "views/JobPage/contants/defaultValue";
import { createMapPropsFromAttrs, loginlineParams } from "views/JobPage/utils";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { GroupPermissionSettingsCotnext } from "..";
import { groupPermissionAttr } from "../contants";
import { settingGroupPermission } from "../redux";
import {
  GroupPermissionForm,
  GroupPermissionFormInner,
} from "./AddGroupPermissionModal";
export const CustomTableBodyCell = styled(TableCell)`
  border-bottom: none;
`;
export const GroupPermissionModal = ({
  loading,
  permissionModules = [],
  onClose,
}) => {
  const { handleSubmit, isValid } = useContext(FormikContext);
  const { t } = useTranslation();
  return (
    <ModalCommon
      loading={loading}
      title={t("Cập nhật nhóm quyền")}
      onClose={onClose}
      footerAction={[
        {
          action: handleSubmit,
          disabled: !isValid || loading,
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
export default ({ item }) => {
  const { setModal } = useContext(GroupPermissionSettingsCotnext);
  const selectDetailGroupPermission = useMemo(() => {
    return (state) =>
      settingGroupPermission.selectors.detailGroupPermissionSelector(
        state,
        item.id
      );
  }, [item]);
  const detail = useSelector(selectDetailGroupPermission) || item;
  const [
    id,
    name,
    permissions = emptyArray,
    description,
    module,
  ] = createMapPropsFromAttrs([
    groupPermissionAttr.id,
    groupPermissionAttr.name,
    groupPermissionAttr.permissions,
    groupPermissionAttr.description,
    groupPermissionAttr.module,
  ])(detail);
  const [{ status }, dispatchAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);
  const handleSubmit = (values) => {
    const mapper = (item) => item.permission;
    dispatchAsyncAction(
      loginlineParams(
        settingGroupPermission.actions.updateGroupPermission({
          group_permission_id: id,
          permissions: permissions.map(mapper),
          ...values,
        })
      )
    );
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      settingGroupPermission.actions.loadDetailGroupPermission({
        group_permission_id: id,
      })
    );
  }, [dispatch, id]);
  const initialValues = useMemo(() => {
    return {
      name,
      description,
      module: "" + module,
    };
  }, [description, module, name]);
  const permissionModules = useSelector(
    settingGroupPermission.selectors.groupModulesListSelector
  );
  useEffect(() => {
    if (status === apiCallStatus.success) {
      onClose();
    }
  }, [onClose, setModal, status]);
  return (
    <GroupPermissionForm initialValues={initialValues} onSubmit={handleSubmit}>
      <GroupPermissionModal
        permissionModules={permissionModules}
        loading={status === apiCallStatus.loading}
        onClose={onClose}
      />
    </GroupPermissionForm>
  );
};
