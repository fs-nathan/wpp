import { Check } from "@material-ui/icons";
import { Paper, Stack } from "@mui/material";
import CustomModal from "components/CustomModal";
import { useState } from "react";
import { useTranslation } from "react-i18next";

const ProjectModeStep = ({ onNext, setopenModal, openModal }) => {
  const [shareOption, setShareOption] = useState("internal");
  const { t } = useTranslation();

  return (
    <CustomModal
      maxWidth="sm"
      height="short"
      setOpen={setopenModal}
      open={openModal}
      confirmRender={() => "Tiếp theo"}
      cancleRender={() => "Huỷ"}
      manualClose={true}
      onConfirm={() => {
        onNext();
      }}
      onCancle={() => {
        setopenModal(false);
      }}
      // canConfirm={false}
      title={t("SHARE_PROJECT_TITLE")}
    >
      <div className="share-project--modal__container">
        <div className="share-project--modal__body">
          <Stack spacing={4}>
            <Paper
              variant="outlined"
              className={`share-project-card ${
                shareOption === "internal" && "share-project-card--active"
              }`}
              onClick={() => setShareOption("internal")}
            >
              <div
                className={`share-project-card-icon ${
                  shareOption === "internal" &&
                  "share-project-card-icon--active"
                }`}
              >
                <Check />
              </div>
              <div className="share-project-card-content">
                <h2>{t("SHARE_PROJECT_TITLE_INTERNAL")}</h2>
                <p>{t("SHARE_PROJECT_TITLE_INTERNAL_CONTENT")}</p>
              </div>
            </Paper>
            <Paper
              variant="outlined"
              className={`share-project-card ${
                shareOption === "public" && "share-project-card--active"
              }`}
              onClick={() => setShareOption("public")}
            >
              <div
                className={`share-project-card-icon  ${
                  shareOption === "public" && "share-project-card-icon--active"
                }`}
              >
                <Check />
              </div>

              <div className="share-project-card-content">
                <h2>{t("SHARE_PROJECT_TITLE_PUBLIC")}</h2>
                <p>{t("SHARE_PROJECT_TITLE_PUBLIC_CONTENT")}</p>
              </div>
            </Paper>
          </Stack>
        </div>
      </div>
    </CustomModal>
  );
};

export default ProjectModeStep;
