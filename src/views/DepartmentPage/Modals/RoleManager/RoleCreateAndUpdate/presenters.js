import { TextField } from '@material-ui/core';
import { get } from 'lodash';
import React from 'react';
import { useTranslation } from 'react-i18next';
import ColorTypo from '../../../../../components/ColorTypo';
import CustomModal from '../../../../../components/CustomModal';
import { useMaxlenString, useRequiredString } from '../../../../../hooks';

function RoleCreateAndUpdate({
  open, setOpen,
  updatedUserRole = null,
  handleCreateOrUpdateUserRole
}) {

  const [name, setName, errorName] = useRequiredString('', 150);
  const [description, setDescription, errorDescription] = useMaxlenString('', 350);
  const { t } = useTranslation();

  React.useEffect(() => {
    if (updatedUserRole) {
      setName(get(updatedUserRole, 'name', ''));
      setDescription(get(updatedUserRole, 'description', ''));
    }
  }, [updatedUserRole, setName, setDescription]);

  return (
    <CustomModal
      open={open}
      setOpen={setOpen}
      title={updatedUserRole ? t('DMH.VIEW.DP.MODAL.ROLE.U_TITLE') : t('DMH.VIEW.DP.MODAL.ROLE.C_TITLE')}
      canConfirm={!errorName && !errorDescription}
      onConfirm={() => handleCreateOrUpdateUserRole(name, description)}
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
