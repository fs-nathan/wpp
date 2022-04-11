import {
  ButtonBase,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  IconButton,
} from "@material-ui/core";
import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";
import PropTypes from "prop-types";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import ColorTypo from "../ColorTypo";
import "./style.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Fade direction="down" ref={ref} {...props} />;
});

function AlertModal({
  open,
  setOpen,
  content = "",
  onConfirm = () => null,
  onCancle = () => null,
  colors,
  canConfirm = true,
  customFooter: CustomFooter,
  manualClose = false,
  actionLoading = false,
  activeLoading = false,
}) {
  const { t } = useTranslation();
  const bgColor = colors.find((item) => item.selected === true);

  function handleCancle() {
    !manualClose && setOpen(false);
    onCancle();
  }

  function handleConfirm() {
    !manualClose && setOpen(false);
    onConfirm();
  }

  return (
    <Dialog
      className="comp_AlertModal___dialog"
      maxWidth="sm"
      open={open}
      TransitionComponent={Transition}
      onClose={() => handleCancle()}
      aria-labelledby="alert-dialog-slide-title"
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogTitle
        className="comp_AlertModal___dialog-title"
        id="alert-dialog-slide-title"
      >
        <ColorTypo uppercase>{t("DMH.COMP.ALERT_MODAL.TITLE")}</ColorTypo>
        <IconButton onClick={() => handleCancle()}>
          <Icon path={mdiClose} size={1} color={"rgba(0, 0, 0, 0.54)"} />
        </IconButton>
      </DialogTitle>
      <DialogContent className="comp_AlertModal___dialog-content">
        {content}
      </DialogContent>
      <DialogActions className="comp_AlertModal___dialog-actions">
        {
          <>
            <ButtonBase
              className="comp_AlertModal___cancle-button"
              onClick={() => handleCancle()}
            >
              {t("DMH.COMP.ALERT_MODAL.CANCLE_BTN")}
            </ButtonBase>
            <ButtonBase
              style={{
                color: bgColor.color,
                opacity:
                  !canConfirm || actionLoading || activeLoading ? 0.5 : 1,
              }}
              className="comp_AlertModal___accept-button"
              onClick={() => handleConfirm()}
              disabled={!canConfirm || actionLoading || activeLoading}
            >
              <CircularProgress
                size={16}
                className="margin-circular"
                style={{
                  display: actionLoading || activeLoading ? "initial" : "none",
                }}
              />
              {t("DMH.COMP.ALERT_MODAL.ACCEPT_BTN")}
            </ButtonBase>
          </>
        }
      </DialogActions>
    </Dialog>
  );
}

AlertModal.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  canConfirm: PropTypes.bool,
  content: PropTypes.node,
  onConfirm: PropTypes.func,
  onCancle: PropTypes.func,
};

export default connect(
  (state) => ({
    colors: state.setting.colors,
  }),
  {}
)(AlertModal);
