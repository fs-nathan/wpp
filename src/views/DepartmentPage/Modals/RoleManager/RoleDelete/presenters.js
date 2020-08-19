import AlertModal from 'components/AlertModal';
import { CustomEventDispose, CustomEventListener, DELETE_USER_ROLE, LIST_USER_ROLE } from 'constants/events';
import React from 'react';
import { useTranslation } from 'react-i18next';

function UserRoleDelete({
  open, setOpen,
  handleDeleteUserRole,
  doReloadUserRole,
}) {

  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(DELETE_USER_ROLE.SUCCESS, doReloadUserRole);
    CustomEventListener(DELETE_USER_ROLE.FAIL, fail);
    return () => {
      CustomEventDispose(DELETE_USER_ROLE.SUCCESS, doReloadUserRole);
      CustomEventDispose(DELETE_USER_ROLE.FAIL, fail);
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
    CustomEventListener(LIST_USER_ROLE.SUCCESS, success);
    CustomEventListener(LIST_USER_ROLE.FAIL, fail);
    return () => {
      CustomEventDispose(LIST_USER_ROLE.SUCCESS, success);
      CustomEventDispose(LIST_USER_ROLE.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AlertModal
      open={open}
      setOpen={setOpen}
      content={t('DMH.VIEW.DP.MODAL.USER_ROLE.ALERT')}
      onConfirm={() => {
        handleDeleteUserRole();
        setActiveLoading(true);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    />
  )
}

export default UserRoleDelete;
