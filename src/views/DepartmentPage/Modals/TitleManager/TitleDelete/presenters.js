import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_POSITION, LIST_POSITION } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';

function PositionDelete({
  open, setOpen,
  handleDeletePosition,
  doReloadPosition,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DELETE_POSITION.SUCCESS, doReloadPosition);
    CustomEventListener(DELETE_POSITION.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_POSITION.SUCCESS, doReloadPosition);
      CustomEventDispose(DELETE_POSITION.FAIL, fail);
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
    CustomEventListener(LIST_POSITION.SUCCESS, success);
    CustomEventListener(LIST_POSITION.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_POSITION.SUCCESS, success);
      CustomEventDispose(LIST_POSITION.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t('DMH.VIEW.DP.MODAL.TITLE.ALERT')}
      onConfirm={() => {
        handleDeletePosition();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default PositionDelete;
