import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_PROJECT_GROUP, LIST_PROJECT_GROUP } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';
import {useHistory} from "react-router-dom";

function ProjectGroupDelete({
  open, setOpen, redirectURL = null,
  handleDeleteProjectGroup,
  doReloadProjectGroup,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);
  const history = useHistory();

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    const handleSuccess = () => {
      doReloadProjectGroup();
      if(redirectURL != null) history.push(redirectURL);
    }
    CustomEventListener(DELETE_PROJECT_GROUP.SUCCESS, handleSuccess);
    CustomEventListener(DELETE_PROJECT_GROUP.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_PROJECT_GROUP.SUCCESS, handleSuccess);
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
