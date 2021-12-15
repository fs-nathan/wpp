import { Typography } from "@material-ui/core";
import React from "react";
import { useTranslation } from "react-i18next";
import JobDetailModalWrap from "views/JobDetailPage/JobDetailModalWrap";
import "./styles.scss";

function CreateGroupTaskModal({
  isOpen,
  title1,
  title2,
  setOpen,
  actionName,
  onClickCreate,
}) {
  const { t } = useTranslation();

  return (
    <JobDetailModalWrap
      title={t("LABEL_CHAT_TASK_THONG_BAO_HE_THONG")}
      open={isOpen}
      setOpen={setOpen}
      confirmRender={null}
      cancleRender={() => t("LABEL_CHAT_TASK_HUY")}
      maxWidth="sm"
      className="CreateGroupTaskModal"
    >
      <React.Fragment>
        <div
          className="CreateGroupTaskModal--title"
          dangerouslySetInnerHTML={{
            __html: title1 ?? t("LABEL_CHAT_TASK_HIEN_TAI_CHUA_CO"),
          }}
        ></div>
        <div className="CreateGroupTaskModal--title">
          {title2 ?? t("LABEL_CHAT_TASK_HAY_TAO_MOI_NHOM")}
        </div>
        <Typography
          className="CreateGroupTaskModal--button"
          onClick={onClickCreate}
        >
          {actionName ?? t("LABEL_CHAT_TASK_TAO_NHOM_CONG_VIEC")}
        </Typography>
      </React.Fragment>
    </JobDetailModalWrap>
  );
}

export default CreateGroupTaskModal;
