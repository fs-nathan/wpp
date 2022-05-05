import { useEffect, useState } from "react";
import AddNewDoneStep from "./Step/AddNewDoneStep";
import CreateProjectStep from "./Step/CreateProjectStep";
import InitialStep from "./Step/InitialStep";
import "./style.scss";

const STEP = {
  INITIAL: "initial",
  CREATE: "create",
  DONE: "done",
};

const ProjectAddNew = ({ handleClose }) => {
  const [step, setStep] = useState(STEP.INITIAL);
  const [projectId, setProjectId] = useState("");

  useEffect(() => {
    handleClose();
  }, [handleClose]);

  function onInitialDone() {
    setStep(STEP.CREATE);
  }

  function onCreateProjectDone(id) {
    setProjectId(id);
    setStep(STEP.DONE);
  }

  function onAddNewDone() {}

  function renderStep() {
    switch (step) {
      case STEP.INITIAL:
        return <InitialStep onNext={onInitialDone} />;
      case STEP.CREATE:
        return (
          <CreateProjectStep
            onNext={onCreateProjectDone}
            onBack={() => setStep(STEP.INITIAL)}
          />
        );
      case STEP.DONE:
        return <AddNewDoneStep onNext={onAddNewDone} projectId={projectId} />;
    }
  }
  return renderStep();
};

export default ProjectAddNew;
