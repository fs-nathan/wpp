import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_DOCUMENTS_USER, DETAIL_USER } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';

function DeleteDocument({
  open, setOpen,
  handleDeleteDocument,
  doReloadUser,
  curUser,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DELETE_DOCUMENTS_USER.SUCCESS, doReloadUser);
    CustomEventListener(DELETE_DOCUMENTS_USER.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_DOCUMENTS_USER.SUCCESS, doReloadUser);
      CustomEventDispose(DELETE_DOCUMENTS_USER.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [curUser]);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
    };
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DETAIL_USER.SUCCESS, success);
    CustomEventListener(DETAIL_USER.FAIL, fail);
    return () => {
      CustomEventDispose(DETAIL_USER.SUCCESS, success);
      CustomEventDispose(DETAIL_USER.FAIL, fail);
    }
    // eslint-disable-next-line
  }, [curUser]);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t('DMH.VIEW.MP.MODAL.DOC.ALERT')}
      onConfirm={() => {
        handleDeleteDocument();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default DeleteDocument;
