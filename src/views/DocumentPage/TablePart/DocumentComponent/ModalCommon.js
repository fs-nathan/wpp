import { DialogTitle } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogActions from "@material-ui/core/DialogActions";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import ColorTypo from "../../../../components/ColorTypo";
import "../DocumentPage.scss";

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});
export const DialogTitleCus = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <DialogTitle disableTypography className={classes.root} {...other}>
      <ColorTypo uppercase>{children}</ColorTypo>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
});

export const DialogActions = withStyles((theme) => ({
  root: { margin: 0, padding: theme.spacing(1) },
}))(MuiDialogActions);

const ModalCommon = (props) => {
  const { t } = useTranslation();
  const isPrimary = props.footerAction.length === 1;
  const bgColor = props.colors.find((item) => item.selected === true);
  return (
    <Dialog
      onClose={props.onClose}
      fullWidth={true}
      maxWidth={props.maxWidth || "sm"}
      aria-labelledby="customized-dialog-title"
      open={true}
      className="modal-common-container"
    >
      <DialogTitleCus
        id="customized-dialog-title"
        onClose={props.onClose}
        className={"modal-cus " + props.className}
      >
        {props.title}
      </DialogTitleCus>
      {props.children}
      {props.footerAction && (
        <DialogActions>
          {props.onClose && props.type !== "share" && (
            <Button
              onClick={props.onClose}
              disableRipple
              className="common-btn-modal"
            >
              {t("IDS_WP_CANCEL")}
            </Button>
          )}

          {props.footerAction.map((el, idx) => (
            <Button
              onClick={el.action}
              className="common-btn-modal"
              style={{
                color:
                  (idx % 2 !== 0 || isPrimary) && el.type !== "cancel"
                    ? bgColor.color
                    : "#222",
                opacity: el.disabled ? 0.5 : 1,
              }}
              key={idx}
              disabled={el.disabled || props.loading}
            >
              {props.loading && (
                <CircularProgress size={20} className="margin-circular" />
              )}
              {el.name}
            </Button>
          ))}
        </DialogActions>
      )}
    </Dialog>
  );
};

export default connect(
  (state) => ({
    colors: state.setting.colors,
  }),
  {}
)(ModalCommon);
