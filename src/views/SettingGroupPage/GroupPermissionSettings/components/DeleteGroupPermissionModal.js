import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogTitle,
  makeStyles,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useCallback, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { createMapPropsFromAttrs } from "views/JobPage/utils";
import { apiCallStatus } from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/types";
import useAsyncTracker from "views/SettingGroupPage/TablePart/SettingGroupRight/Home/redux/apiCall/useAsyncTracker";
import { GroupPermissionSettingsCotnext } from "..";
import { groupPermissionAttr } from "../contants";
import { settingGroupPermission } from "../redux";
const useStyles = makeStyles((theme) => ({
  wrapper: {
    margin: theme.spacing(1),
    position: "relative",
  },

  buttonProgress: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12,
  },
}));
const LoadingWrap = ({ loading, children }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      {children}
      {loading && (
        <CircularProgress size={24} className={classes.buttonProgress} />
      )}
    </div>
  );
};

export function DeleteGroupPermissionModalStateLess({
  loading,
  onClose,
  onDelete,
}) {
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
        <LoadingWrap loading={loading}>
          <Button
            onClick={onDelete}
            variant="contained"
            color="secondary"
            disabled={loading}
            startIcon={<DeleteIcon />}
          >
            {t("Delete")}
          </Button>
        </LoadingWrap>
      </DialogActions>
    </Dialog>
  );
}

export default ({ item }) => {
  const { setModal, detail, setSelect } = useContext(
    GroupPermissionSettingsCotnext
  );
  const [id] = createMapPropsFromAttrs([
    groupPermissionAttr.id,
    groupPermissionAttr.name,
    groupPermissionAttr.permissions,
  ])(item);
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
    <DeleteGroupPermissionModalStateLess
      loading={status === apiCallStatus.loading}
      onDelete={handleSubmit}
      onClose={onClose}
    />
  );
};
