import CustomModal from "components/CustomModalGantt";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import "./index.scss";
import ProjectModeStep from "./Step/ProjectModeStep";
import ShareStep from "./Step/ShareStep";

const STEP = {
  PROJECT_MODE: "project_mode",
  SHARE: "share",
};

const ShareProjectModal = ({ setopenModal, openModal }) => {
  const { t } = useTranslation();
  const [step, setStep] = useState(STEP.PROJECT_MODE);

  function onSelectMode() {
    setStep(STEP.SHARE);
  }

  function onShareDone() {
    setopenModal(false);
    setStep(STEP.PROJECT_MODE);
  }

  function renderStep() {
    switch (step) {
      case STEP.PROJECT_MODE:
        return (
          <ProjectModeStep
            onNext={onSelectMode}
            setopenModal={setopenModal}
            openModal={openModal}
          />
        );
      case STEP.SHARE:
        return (
          <ShareStep
            onBack={() => setStep(STEP.PROJECT_MODE)}
            onNext={onShareDone}
            setopenModal={setopenModal}
            openModal={openModal}
          />
        );
    }
  }
  return renderStep();
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ShareProjectModal);
