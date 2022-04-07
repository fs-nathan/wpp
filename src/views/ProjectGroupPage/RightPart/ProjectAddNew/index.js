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

const ProjectAddNew = ({ handleExpand }) => {
  const [step, setStep] = useState(STEP.INITIAL);

  useEffect(() => {
    handleExpand();
  }, []);

  function onInitialDone() {
    setStep(STEP.CREATE);
  }

  function onCreateProjectDone() {
    setStep(STEP.DONE);
  }

  function onAddNewDone() {}

  function renderStep() {
    switch (step) {
      case STEP.INITIAL:
        return <InitialStep onNext={onInitialDone} />;
      case STEP.CREATE:
        return <CreateProjectStep onNext={onCreateProjectDone} />;
      case STEP.DONE:
        return <AddNewDoneStep onNext={onAddNewDone} />;
    }
  }
  return renderStep();
};

export default ProjectAddNew;
