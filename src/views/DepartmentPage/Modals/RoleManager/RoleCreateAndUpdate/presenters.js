import { TextField } from '@material-ui/core';
import ColorTypo from 'components/ColorTypo';
import CustomModal from 'components/CustomModal';
import { CREATE_USER_ROLE, CustomEventDispose, CustomEventListener, UPDATE_USER_ROLE } from 'constants/events';
import { useMaxlenString, useRequiredString } from 'hooks';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';

function RoleCreateAndUpdate({
  open, setOpen,
  updatedUserRole = null,
  handleCreateOrUpdateUserRole,
  activeLoading,
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (updatedUserRole) {
      setName(get(updatedUserRole, 'name', ''));
      setDescription(get(updatedUserRole, 'description', ''));
    }
    // eslint-disable-next-line
  }, [updatedUserRole]);

  React.useEffect(() => {
    const successClose = () => {
      setOpen(false);
      setName('');
      setDescription('');
    };
    CustomEventListener(CREATE_USER_ROLE, successClose);
    CustomEventListener(UPDATE_USER_ROLE, successClose);
    return () => {
      CustomEventDispose(CREATE_USER_ROLE, successClose);
      CustomEventDispose(UPDATE_USER_ROLE, successClose);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedUserRole ? t('DMH.VIEW.DP.MODAL.ROLE.U_TITLE') : t('DMH.VIEW.DP.MODAL.ROLE.C_TITLE')}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateUserRole(name, description)}
      onCancle={() => setOpen(false)}
      manualClose={false}
      activeLoading={activeLoading}
    >
      <TextField
        value={name}
        onChange={evt => setName(evt.target.value)}
        label={t('DMH.VIEW.DP.MODAL.ROLE.NAME')}
        margin="normal"
        variant="outlined"
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorName, 'message', '')}
          </ColorTypo>
        }
      />
      <TextField
        value={description}
        onChange={evt => setDescription(evt.target.value)}
        label={t('DMH.VIEW.DP.MODAL.ROLE.DESC')}
        margin="normal"
        variant="outlined"
        fullWidth
        helperText={
          <ColorTypo variant='caption' color='red'>
            {get(errorDescription, 'message', '')}
          </ColorTypo>
        }
      />
    </CustomModal>
  )
}

export default RoleCreateAndUpdate;
