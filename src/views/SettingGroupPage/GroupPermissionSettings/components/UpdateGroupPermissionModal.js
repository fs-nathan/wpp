import { Formik, FormikConsumer } from "formik";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { emptyObject } from "views/JobPage/contants/defaultValue";
import { get } from "views/JobPage/utils";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { GroupPermissionSettingsCotnext } from "..";
import { settingGroupPermission } from "../redux";
import { SetPermissionModal } from "./SetPermissionModal";

const addGroupPermissionFormInitialValues = { permissions: [] };

const createValidate = (schema) => (values = {}, mapError = {}) => {
  const { error } = schema.validate(values);
  return error
    ? error.details.reduce((result, error) => {
        result[error.context.key] = mapError[error.type] || error.type;
        return result;
      }, {})
    : emptyObject;
};
// const validateUpdateGroupPermissionForm = createValidate(
//   Joi.object({
//     name: Joi.string().required(),
//     logo: Joi.any(),
//     p: Joi.any(),
//   })
// );
const UpdateGroupPermissionForm = ({ initialValues, children, onSubmit }) => {
  // error.details[0].type
  const { t } = useTranslation();
  // const validateMemo = useMemo(
  //   () => (values = {}) => {
  //     const mapError = { "string.empty": t("required") };
  //     return validateUpdateGroupPermissionForm(values, mapError);
  //   },
  //   [t]
  // );
  return (
    <Formik
      initialValues={initialValues || addGroupPermissionFormInitialValues}
      onSubmit={onSubmit}
      // validate={validateMemo}
    >
      {children}
    </Formik>
  );
};
export default ({ item }) => {
  const { setModal } = useContext(GroupPermissionSettingsCotnext);
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(settingGroupPermission.actions.loadPermissionViewGroupSetting());
  }, [dispatch]);
  useEffect(() => {
    if (status === apiCallStatus.success) {
      onClose();
    }
  }, [onClose, status]);
  const handleSubmit = (values) => setAsyncAction(null);
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
  const initialValues = useMemo(
    () => ({
      permissions: get(item, "permissions", []),
    }),
    [item]
  );
  if (!item) return null;
  return (
    <UpdateGroupPermissionForm
      initialValues={initialValues}
      onSubmit={handleSubmit}
    >
      <FormikConsumer>
        {({ values, handleSubmit }) => {
          return (
            <SetPermissionModal
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
