import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP, LIST_PROJECT_GROUP } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';

function ProjectGroupDelete({
  open, setOpen,
  handleDeleteProjectGroup,
  doReloadProjectGroup,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DELETE_PROJECT_GROUP.SUCCESS, doReloadProjectGroup);
    CustomEventListener(DELETE_PROJECT_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_PROJECT_GROUP.SUCCESS, doReloadProjectGroup);
      CustomEventDispose(DELETE_PROJECT_GROUP.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(LIST_PROJECT_GROUP.SUCCESS, success);
    CustomEventListener(LIST_PROJECT_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_PROJECT_GROUP.SUCCESS, success);
      CustomEventDispose(LIST_PROJECT_GROUP.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t('DMH.VIEW.PGP.LEFT.INFO.ALERT')}
      onConfirm={() => {
        handleDeleteProjectGroup();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default ProjectGroupDelete;
