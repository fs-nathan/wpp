import { Button, Dialog, DialogActions, DialogTitle } from "@material-ui/core";
import colors from "helpers/colorPalette";
import React, { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { GroupPermissionSettingsCotnext } from "..";
import { groupPermissionAttr } from "../contants";
import { settingGroupPermission } from "../redux";

function DeleteGroupPermissionModal({ loading, onClose, onDelete }) {
  const { t } = useTranslation();
  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete?"}</DialogTitle>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          {t("Cancel")}
        </Button>
        <Button onClick={onDelete} color={colors.red[0]} autoFocus>
          {t("Delete")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default () => {
  const { setModal, select, setSelect } = useContext(
    GroupPermissionSettingsCotnext
  );
  const [id, name, permissions] = createMapPropsFromAttrs([
    groupPermissionAttr.id,
    groupPermissionAttr.name,
    groupPermissionAttr.permissions,
  ])(select);
  const [{ status }, setAsyncAction] = useAsyncTracker();
  const onClose = useCallback(() => {
    setModal(null);
  }, [setModal]);
  useEffect(() => {
    if (status === apiCallStatus.success) {
      setSelect(undefined);
      onClose();
    }
  }, [onClose, setSelect, status]);
  const handleSubmit = () =>
    setAsyncAction(
      settingGroupPermission.actions.deleteGroupPermission({
        group_permission_id: id,
      })
    );
  return (
    <DeleteGroupPermissionModal
      loading={status === apiCallStatus.loading}
      onDelete={handleSubmit}
      onClose={onClose}
    />
  );
};
