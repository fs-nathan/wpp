import CustomModal from 'components/CustomModal';
import CustomTextbox from 'components/CustomTextbox';
import { CREATE_USER_ROLE, CustomEventDispose, CustomEventListener, LIST_USER_ROLE, UPDATE_USER_ROLE } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function RoleCreateAndUpdate({
  open, setOpen,
  updatedUserRole = null,
  handleCreateOrUpdateUserRole,
  doReloadUserRole,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();
  const [activeLoading, setActiveLoading] = React.useState(false);

  React.useEffect(() => {
    if (updatedUserRole) {
      setName(get(updatedUserRole, 'name', ''));
      setDescription(get(updatedUserRole, 'description', ''));
    }
    // eslint-disable-next-line
  }, [updatedUserRole]);

  React.useEffect(() => {
    const fail = () => {
      setActiveLoading(false);
    };
    CustomEventListener(CREATE_USER_ROLE.SUCCESS, doReloadUserRole);
    CustomEventListener(UPDATE_USER_ROLE.SUCCESS, doReloadUserRole);
    CustomEventListener(CREATE_USER_ROLE.FAIL, fail);
    CustomEventListener(UPDATE_USER_ROLE.FAIL, fail);
    return () => {
      CustomEventDispose(CREATE_USER_ROLE.SUCCESS, doReloadUserRole);
      CustomEventDispose(UPDATE_USER_ROLE.SUCCESS, doReloadUserRole);
      CustomEventDispose(CREATE_USER_ROLE.FAIL, fail);
      CustomEventDispose(UPDATE_USER_ROLE.FAIL, fail);
    }
    // eslint-disable-next-line
  }, []);

  React.useEffect(() => {
    const success = () => {
      setActiveLoading(false);
      setOpen(false);
      setName('');
      setDescription('');
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
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedUserRole ? t('DMH.VIEW.DP.MODAL.ROLE.U_TITLE') : t('DMH.VIEW.DP.MODAL.ROLE.C_TITLE')}
      canConfirm={!errorName}
      onConfirm={() => {
        handleCreateOrUpdateUserRole(name, description);
        setActiveLoading(false);
      }}
      onCancle={() => setOpen(false)}
      manualClose={true}
      activeLoading={activeLoading}
    >
      <CustomTextbox
        value={name}
        onChange={newName => setName(newName)}
        label={t('DMH.VIEW.DP.MODAL.ROLE.NAME')}
        fullWidth
        required={true}
      />
      <CustomTextbox
        value={description}
        onChange={newDescription => setDescription(newDescription)}
        label={t('DMH.VIEW.DP.MODAL.ROLE.DESC')}
        fullWidth
        multiline={true}
      />
    </CustomModal>
  )
}

export default RoleCreateAndUpdate;
