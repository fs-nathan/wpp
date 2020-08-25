import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_MAJOR, LIST_MAJOR } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';

function MajorDelete({
  open, setOpen,
  handleDeleteMajor,
  doReloadMajor,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DELETE_MAJOR.SUCCESS, doReloadMajor);
    CustomEventListener(DELETE_MAJOR.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_MAJOR.SUCCESS, doReloadMajor);
      CustomEventDispose(DELETE_MAJOR.FAIL, fail);
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
    CustomEventListener(LIST_MAJOR.SUCCESS, success);
    CustomEventListener(LIST_MAJOR.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_MAJOR.SUCCESS, success);
      CustomEventDispose(LIST_MAJOR.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t('DMH.VIEW.DP.MODAL.MAJOR.ALERT')}
      onConfirm={() => {
        handleDeleteMajor();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default MajorDelete;
