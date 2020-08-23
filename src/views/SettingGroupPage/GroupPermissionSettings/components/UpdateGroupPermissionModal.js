import { Formik, FormikConsumer } from "formik";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get } from "views/JobPage/utils";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { GroupPermissionSettingsContext } from "..";
import { groupPermissionAttr } from "../contants";
import { settingGroupPermission } from "../redux";
import { SetPermissionModal } from "./SetPermissionModal";

const addGroupPermissionFormInitialValues = { permissions: [] };

const UpdateGroupPermissionForm = ({ initialValues, children, onSubmit }) => {
  return (
    <Formik
      enableReinitialize
      validateOnMount
      initialValues={initialValues || addGroupPermissionFormInitialValues}
      onSubmit={onSubmit}
    >
      {children}
    </Formik>
  );
};
export default ({ item }) => {
  const { setModal } = useContext(GroupPermissionSettingsContext);
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);
  const dispatch = useDispatch();
  useEffect(() => {
    if (status === apiCallStatus.success) {
      onClose();
    }
  }, [onClose, status]);
  const handleSubmit = (values) =>
    setAsyncAction(
      settingGroupPermission.actions.updateGroupPermission({
        group_permission_id: get(item, groupPermissionAttr.id),
        ...values,
      })
    );
  useEffect(() => {
    item &&
      dispatch(
        settingGroupPermission.actions.loadPermissionList({
          module: item.module,
        })
      );
  }, [dispatch, item]);
  const permissionList = useSelector(
    settingGroupPermission.selectors.permissionListSelector
  );
  const initialValues = useMemo(() => {
    const mapper = (item) => item.permission;
    return {
      permissions: get(item, "permissions", []).map(mapper),
    };
  }, [item]);
  if (!item) return null;
  return (
    <UpdateGroupPermissionForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <FormikConsumer>
        {({ values, handleSubmit, isValid, handleChange }) => {
          return (
            <SetPermissionModal
              name="permissions"
              isValid={isValid}
              onChange={handleChange}
              value={values.permissions}
              onSubmit={handleSubmit}
              permissionList={permissionList}
              loading={status === apiCallStatus.loading}
              onClose={onClose}
            />
          );
        }}
      </FormikConsumer>
    </UpdateGroupPermissionForm>
  );
};
