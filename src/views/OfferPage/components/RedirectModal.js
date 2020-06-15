import Button from "@material-ui/core/Button";
import React from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Routes } from "../../../constants/routes";
import ModalCommon from "../../DocumentPage/TablePart/DocumentComponent/ModalCommon";
import { DialogContent } from "../../DocumentPage/TablePart/DocumentComponent/TableCommon";

const RedirectModal = props => {
  const { t } = useTranslation();
  const bgColor = props.colors.find(item => item.selected === true);
  return (
    <ModalCommon
      title={t("VIEW_OFFER_LABEL_CREATE_NEW_OFFER")}
      onClose={props.onClose}
      footerAction={[]}
    >
      <DialogContent dividers className="dialog-content redirect-modal">
        <p className="redirect-text">
          {t("VIEW_OFFER_TEXT_CREATE_NEW_OFFER_SHOULD_REDIRECT")}
        </p>
        <Button
          variant="outlined"
          className="redirect-btn"
          onClick={() => {
            props.history.push(Routes.TASKS);
            props.onClose();
          }}
          style={{
            background: bgColor.color,
            borderColor: bgColor.color,
            color: "#fff"
          }}
        >
          {t("VIEW_OFFER_LABEL_REDIRECT_TO_TASK")}
        </Button>
      </DialogContent>
    </ModalCommon>
  );
};

export default connect(
  state => ({
    colors: state.setting.colors
  }),
  {}
)(withRouter(RedirectModal));
