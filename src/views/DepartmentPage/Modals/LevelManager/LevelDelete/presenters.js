import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_LEVEL, LIST_LEVEL } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';

function LevelDelete({
  open, setOpen,
  handleDeleteLevel,
  doReloadLevel,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DELETE_LEVEL.SUCCESS, doReloadLevel);
    CustomEventListener(DELETE_LEVEL.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_LEVEL.SUCCESS, doReloadLevel);
      CustomEventDispose(DELETE_LEVEL.FAIL, fail);
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
    CustomEventListener(LIST_LEVEL.SUCCESS, success);
    CustomEventListener(LIST_LEVEL.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_LEVEL.SUCCESS, success);
      CustomEventDispose(LIST_LEVEL.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t('DMH.VIEW.DP.MODAL.LEVEL.ALERT')}
      onConfirm={() => {
        handleDeleteLevel();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default LevelDelete;
