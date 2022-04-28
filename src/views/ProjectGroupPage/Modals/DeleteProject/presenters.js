import AlertModal from "components/AlertModal";
import {
  CustomEventDispose,
  CustomEventListener,
  DELETE_PROJECT,
  LIST_PROJECT,
} from "constants/events";
import React from "react";
import { useTranslation } from "react-i18next";

function ProjectDelete({
  open,
  setOpen,
  handleDeleteProject,
  doReloadProject,
  projectGroupId,
  timeRange,
  doAfterSuccess = () => {},
}) {
  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DELETE_PROJECT.SUCCESS, doReloadProject);
    CustomEventListener(DELETE_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_PROJECT.SUCCESS, doReloadProject);
      CustomEventDispose(DELETE_PROJECT.FAIL, fail);
    };
    // eslint-disable-next-line
  }, [projectGroupId, timeRange]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      doAfterSuccess();
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT.SUCCESS, success);
    CustomEventListener(LIST_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT.FAIL, fail);
    };
    // eslint-disable-next-line
  }, [projectGroupId, timeRange]);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t("DMH.VIEW.PGP.RIGHT.ALL.ALERT")}
      onConfirm={() => {
        handleDeleteProject();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  );
}

export default ProjectDelete;

export function DeleteProjectNoReload({ open, setOpen, handleDeleteProject }) {
  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
    };
    CustomEventListener(DELETE_PROJECT.SUCCESS, success);
    CustomEventListener(DELETE_PROJECT.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_PROJECT.SUCCESS, success);
      CustomEventDispose(DELETE_PROJECT.FAIL, fail);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t("DMH.VIEW.PGP.RIGHT.ALL.ALERT")}
      onConfirm={() => {
        handleDeleteProject();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  );
}
